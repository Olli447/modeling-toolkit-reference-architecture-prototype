import {Component, OnInit, ViewChild} from '@angular/core';
import {SettingComponent} from '../../../core/classes/settingItem';
import {SettingsSidebarComponent} from '../../../frontend/modelling/settings-sidebar/settings-sidebar.component';
import {UmlAssociationInstance} from '../../relations/umlAssociation';
import {MatButton} from '@angular/material';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {HelperFunctions} from '../../../core/classes/helperFunctions';
import {SimpleCardinality} from '../../../core/classes/cardinality';
import * as go from 'gojs';

@Component({
  selector: 'app-uml-association-settings',
  templateUrl: './uml-association-settings.component.html',
  styleUrls: ['./uml-association-settings.component.scss']
})
/**
 * This class represents the attributes of a UML Association relation
 *
 * The according data (linkData) is received by the {@link SettingsSidebarComponent}, including with a reference to itself.
 * On initialization of the component the data is being cloned to linkData. Then the underlying data structure for the according relation is loaded.
 * If the properties defined by the data structure are not present yet, they will be created when the sidebar is being submitted.
 * Internally the uml_association_instance is created with a standard, empty structure, if no data could be loaded.
 *
 * The uml_association_instance is used to present the data to the user
 */
export class UmlAssociationSettingsComponent implements OnInit, SettingComponent {
    data: any;
    parentComponent: SettingsSidebarComponent = this.modellingToolkit.settingSidebarComponent;

    linkData: any;
    uml_association_instance: UmlAssociationInstance;

    @ViewChild('submitAssociationForm') button: MatButton;
    constructor(
        private modellingToolkit: ModellingToolkitService
    ) { }

    /**
     * Clones the data and creates the according data structure
     * If there is no data, the fields will be created with an default (empty string, false or null)
     */
    ngOnInit() {
      const helper = new HelperFunctions();
      this.linkData = helper.deepCopy(this.data);
      this.uml_association_instance = new UmlAssociationInstance(
          this.linkData.uml_association_name,
          this.linkData.uml_association_isDerived,
          this.linkData.uml_association_visibility,
          this.linkData.uml_association_readingDirectionIsRight,
          this.linkData.uml_association_cardinality
      );
      if (!this.linkData.uml_association_name) {
        this.uml_association_instance.uml_association_name = '';
      }
      if (!this.linkData.uml_association_isDerived) {
        this.uml_association_instance.uml_association_isDerived = false;
      }
      if (!this.linkData.uml_association_visibility) {
        this.uml_association_instance.uml_association_visibility = '';
      }
      if (!this.linkData.uml_association_readingDirectionIsRight) {
        this.uml_association_instance.uml_association_readingDirectionIsRight = false;
      }
      if (!this.linkData.uml_association_cardinality) {
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

    /**
     * If the form is submitted the data in the structure will be written back to the model an the changes will appear
     *
     *
     * Remember that the data needs to be a copy and not the real model data!
     */
    onSubmit() {
        const link: go.Link = this.modellingToolkit.findLinksByExample(this.linkData).first();
        const linkData = link.data;
        this.modellingToolkit.startTransaction('update link', this.linkData.key);
        this.modellingToolkit.setDataProperty(linkData, 'uml_association_name', this.uml_association_instance.uml_association_name);
        this.modellingToolkit.setDataProperty(linkData, 'uml_association_isDerived', this.uml_association_instance.uml_association_isDerived);
        this.modellingToolkit.setDataProperty(linkData, 'uml_association_visibility', this.uml_association_instance.uml_association_visibility);
        this.modellingToolkit.setDataProperty(linkData,
            'uml_association_readingDirectionIsRight',
            this.uml_association_instance.uml_association_readingDirectionIsRight
        );
        this.modellingToolkit.setDataProperty(linkData, 'uml_association_cardinality', this.uml_association_instance.uml_association_cardinality);

        this.modellingToolkit.commitTransaction('update link', this.linkData.key);
        // close the sidebar when done
        this.parentComponent.close();
    }

    /**
     * Deletes the relation
     */
    public delete(): void {
        const links = this.modellingToolkit.findLinksByExample(this.linkData);
        this.modellingToolkit.startTransaction('remove link', this.linkData.key,  this.linkData.from, this.linkData.to);
        this.modellingToolkit.removeParts(links);
        this.modellingToolkit.commitTransaction('remove link', this.linkData.key,  this.linkData.from, this.linkData.to);
        this.parentComponent.close();
    }
}
