import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Relation} from '../../../../classes/relation';
import {ModellingToolkitService} from '../../../../core/modelling-toolkit.service';
import * as go from 'gojs';
import {tokenReference} from '@angular/compiler';
import {HelperFunctions} from '../../../../classes/helperFunctions';
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
export class ElementRelationSelectionComponent implements OnInit {
  @Input()
  element: Relation;

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
        relation: Relation;
    };
    this.data.relation = this.element;
    this.modellingToolkit.modellingAreaComponent.diagram.addDiagramListener('ChangedSelection', (e) => {
          if (!e.diagram.selection.first()) { return; }
          if (!(e.diagram.selection.first() instanceof go.Node)) { return; }
          if (!this.isActive) { return; }
          const helper = new HelperFunctions();
          const nodeData = helper.deepCopy(e.diagram.selection.first().data);

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

          this.modellingToolkit.modellingAreaComponent.diagram.clearSelection();
    });
  }

  abort() {
    this.isActive = false;
    this.data = null;
    this.elementSelctionCompleted.emit(this.data);
  }

  submit() {
    this.isActive = false;
    this.modellingToolkit.modellingAreaComponent.createLink(this.data);
    this.elementSelctionCompleted.emit(this.data);
  }

  onDeleteSelection() {
      this.errorMsg = null;
  }

}

export interface RelationSelectionData {
    fromEntity: any;
    toEntity: any;
    relation: Relation;
}
