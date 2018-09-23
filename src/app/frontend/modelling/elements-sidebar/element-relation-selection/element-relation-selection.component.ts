import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractRelation} from '../../../../core/classes/abstractRelation';
import {ModellingToolkitService} from '../../../../core/modelling-toolkit.service';
import * as go from 'gojs';
import {tokenReference} from '@angular/compiler';
import {HelperFunctions} from '../../../../core/classes/helperFunctions';
import {ContentCheckManagerService} from '../../../../core/content-check-manager.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-element-relation-selection',
  templateUrl: './element-relation-selection.component.html',
  styleUrls: ['./element-relation-selection.component.scss'],
    animations: [
        trigger('animationOption2', [
            transition(':enter', [
                style({
                    opacity: '0',
                    overflow: 'hidden',
                    height: '0px'
                }),
                animate(300)
            ]),
            transition(':leave', [
                animate(300, style({
                    opacity: '0',
                    overflow: 'hidden',
                    height: '0px'
                }))
            ]),
            state('*', style({
                overflow: 'hidden',
                height: '*'
            })),
        ])
    ]
})
/**
 * This component is the overlay that guides you through the creation of a relation. It is located directly in ElementsSidebarComponent
 * See {@link ElementRelationSelectionComponent} and {@link ElementsSidebarComponent} if you want to know how the overlay is triggered
 * */
export class ElementRelationSelectionComponent implements OnInit {
  @Input()
  element: AbstractRelation;

  @Output()
  elementSelctionCompleted = new EventEmitter<RelationSelectionData>();

  data: RelationSelectionData;
  isActive: boolean;

  fromName: string;
  toName: string;

  isValid = false;
  errorMsg: string;



  constructor(
      private modellingToolkit: ModellingToolkitService,
      private contentCheckManager: ContentCheckManagerService
  ) { }

  ngOnInit() {
    this.isActive = true;
    this.data = new class implements RelationSelectionData {
        fromEntity: any;
        toEntity: any;
        relation: AbstractRelation;
    };
    this.data.relation = this.element;
    // We want to be notified if the user selected a node in the modelling area
    this.modellingToolkit.modellingAreaComponent.diagram.addDiagramListener('ChangedSelection', (e) => {
          if (!e.diagram.selection.first()) { return; }
          // The selected part should be a node
          if (!(e.diagram.selection.first() instanceof go.Node)) { return; }
          // If the overlay isn't active do noting
          if (!this.isActive) { return; }
          const helper = new HelperFunctions();
          // If you want to work with model data: Copy it
          const nodeData = helper.deepCopy(e.diagram.selection.first().data);

          // Select two entities in succession
          if (!this.data.fromEntity) {
            this.data.fromEntity = nodeData.key;
            this.fromName = nodeData.uml_class_name;
          } else if (!this.data.toEntity) {
            this.data.toEntity = nodeData.key;
            this.toName = nodeData.uml_class_name;
          }

          if (this.data.fromEntity && this.data.toEntity)  {
              const returnValue = this.contentCheckManager.doLinkCheck(this.data, this.element);
              this.isValid = !returnValue.isFailed;
              this.errorMsg = returnValue.errorMsg;
          }

          // remove the selection after it has been processed
          this.modellingToolkit.clearSelection();
    });
  }

  abort() {
    this.isActive = false;
    this.data = null;
    this.elementSelctionCompleted.emit(this.data);
  }

  submit() {
    this.isActive = false;
    this.modellingToolkit.createLink(this.data);
    this.elementSelctionCompleted.emit(this.data);
  }

  onDeleteSelection() {
      this.errorMsg = null;
  }

}

export interface RelationSelectionData {
    fromEntity: any;
    toEntity: any;
    relation: AbstractRelation;
}
