import {Component, OnInit, ViewChild} from '@angular/core';
import {SettingComponent} from '../../classes/settingItem';
import {SettingsSidebarComponent} from '../../frontend/modelling/settings-sidebar/settings-sidebar.component';
import {UmlAssociationInstance} from '../relations/umlAssociation';
import {MatButton} from '@angular/material';
import {ModellingToolkitService} from '../../core/modelling-toolkit.service';
import {HelperFunctions} from '../../classes/helperFunctions';
import {SimpleCardinality} from '../../classes/cardinality';
import * as go from 'gojs';

@Component({
  selector: 'app-uml-association-settings',
  templateUrl: './uml-association-settings.component.html',
  styleUrls: ['./uml-association-settings.component.scss']
})
export class UmlAssociationSettingsComponent implements OnInit, SettingComponent {
    data: any;
    parentComponent: SettingsSidebarComponent = this.modellingToolkit.settingSidebarComponent;

    nodeData: any;
    uml_association_instance: UmlAssociationInstance;

    @ViewChild('submitAssociationForm') button: MatButton;
    constructor(
        private modellingToolkit: ModellingToolkitService
    ) { }

    ngOnInit() {
      const helper = new HelperFunctions();
      this.nodeData = helper.deepCopy(this.data);
      this.uml_association_instance = new UmlAssociationInstance(
          this.nodeData.uml_association_name,
          this.nodeData.uml_association_isDerived,
          this.nodeData.uml_association_visibility,
          this.nodeData.uml_association_readingDirectionIsRight,
          this.nodeData.uml_association_cardinality
      );
      if (!this.nodeData.uml_association_name) {
        this.uml_association_instance.uml_association_name = '';
      }
      if (!this.nodeData.uml_association_isDerived) {
        this.uml_association_instance.uml_association_isDerived = false;
      }
      if (!this.nodeData.uml_association_visibility) {
        this.uml_association_instance.uml_association_visibility = '';
      }
      if (!this.nodeData.uml_association_readingDirectionIsRight) {
        this.uml_association_instance.uml_association_readingDirectionIsRight = false;
      }
      if (!this.nodeData.uml_association_cardinality) {
        this.uml_association_instance.uml_association_cardinality = new SimpleCardinality(
              {
                  min: '',
                  max: ''
              }, {
                  min: '',
                  max: ''
              }
            );
      }
    }

    onSubmit() {
        const diagram = this.modellingToolkit.modellingAreaComponent.diagram;
        const link: go.Link = diagram.findLinksByExample(this.nodeData).first();
        const linkData = link.data;
        diagram.startTransaction('update link:' + this.nodeData.key);
        diagram.model.setDataProperty(linkData, 'uml_association_name', this.uml_association_instance.uml_association_name);
        diagram.model.setDataProperty(linkData, 'uml_association_isDerived', this.uml_association_instance.uml_association_isDerived);
        diagram.model.setDataProperty(linkData, 'uml_association_visibility', this.uml_association_instance.uml_association_visibility);
        diagram.model.setDataProperty(linkData,
            'uml_association_readingDirectionIsRight',
            this.uml_association_instance.uml_association_readingDirectionIsRight
        );
        diagram.model.setDataProperty(linkData, 'uml_association_cardinality', this.uml_association_instance.uml_association_cardinality);

        diagram.commitTransaction('update link:' + this.nodeData.key);
        this.parentComponent.close();
    }

    public delete(): void {
        const diagram = this.modellingToolkit.modellingAreaComponent.diagram;
        const links = diagram.findLinksByExample(this.nodeData);
        diagram.startTransaction('remove link from ' + this.nodeData.from + ' to ' + this.nodeData.to + ' with id ' + this.nodeData.key);
        diagram.removeParts(links, false);
        diagram.commitTransaction('remove link from ' + this.nodeData.from + ' to ' + this.nodeData.to + ' with id ' + this.nodeData.key);
        this.parentComponent.close();
    }
}
