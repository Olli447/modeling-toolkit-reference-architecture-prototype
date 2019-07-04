import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SettingComponent, SettingItem} from '../../../core/classes/settingItem';
import {UmlClassInstance} from '../../entities/class';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {SettingsSidebarComponent} from '../../../frontend/modelling/settings-sidebar/settings-sidebar.component';
import {MatButton} from '@angular/material';
import {UmlClassAttributes} from '../../classes/property';
import {UmlClassOperations, UmlClassOperationsParameters} from '../../classes/operation';
import {HelperFunctions} from '../../../core/classes/helperFunctions';

@Component({
  selector: 'app-uml-class-settings',
  templateUrl: './uml-class-settings.component.html',
  styleUrls: ['./uml-class-settings.component.scss']
})
/**
 * This class represents the attributes of a UML Class
 *
 * The according data (nodeData) is received by the {@link SettingsSidebarComponent}, including with a reference to itself.
 * On initialization of the component the data is being cloned to nodeData. Then the underlying data structure for the entity is loaded.
 * If the properties defined by the data structure are not present yet, they will be created when the sidebar is being submitted.
 * Internally the uml_class_instance is created with a standard, empty structure, if no data could be loaded.
 *
 * The uml_class_instance is used to present the data to the user
 */
export class UmlClassSettingsComponent implements OnInit, SettingComponent, AfterViewInit {

  parentComponent: SettingsSidebarComponent = this.modellingToolkit.settingSidebarComponent;
  data: any;
  nodedata: any;
  uml_class_instance: UmlClassInstance;

  @ViewChild('submitClassForm', { static: true }) button: MatButton;

  ngAfterViewInit() {
      this.button.focus();
  }

  trackByIndex(index: number, obj: any): any {
        return index;
  }

  constructor(
      private modellingToolkit: ModellingToolkitService
  ) { }

  /**
   * Clones the data and creates the according data structure
   * If there is no data, the fields will be created with an default (empty string, false or null)
   */
  ngOnInit() {
      const helper = new HelperFunctions();
      this.nodedata = helper.deepCopy(this.data);
      this.uml_class_instance = new UmlClassInstance(
        this.nodedata.key,
        this.nodedata.uml_class_keyword,
        this.nodedata.uml_class_name,
        this.nodedata.uml_class_property,
        this.nodedata.uml_class_attributes,
        this.nodedata.uml_class_operations
    );
    if (!this.nodedata.uml_class_keyword) {
        this.uml_class_instance.uml_class_keyword = '';
    }
    if (!this.nodedata.uml_class_name) {
        this.uml_class_instance.uml_class_name = '';
    }
    if (!this.nodedata.uml_class_property) {
        this.uml_class_instance.uml_class_property = '';
    }
    if (!(this.nodedata.uml_class_attributes instanceof Array)) {
      this.uml_class_instance.uml_class_attributes = [];
      this.addAttribute();
    }
    if (!(this.nodedata.uml_class_operations instanceof Array)) {
      this.uml_class_instance.uml_class_operations = [];
      this.addOperation();
    }
  }

  /**
   * If the form is submitted the data in the structure will be written back to the model an the changes will appear
   *
   *
   * Remember that the data needs to be a copy and not the real model data!
   */
  onSubmit() {
    const tempNodedata = this.modellingToolkit.findNodeDataForKey(this.nodedata.key);
      this.modellingToolkit.startTransaction('update node', this.uml_class_instance.id);
      this.modellingToolkit.setDataProperty(tempNodedata, 'uml_class_keyword', this.uml_class_instance.uml_class_keyword);
      this.modellingToolkit.setDataProperty(tempNodedata, 'name', this.uml_class_instance.uml_class_name);
      this.modellingToolkit.setDataProperty(tempNodedata, 'uml_class_name', this.uml_class_instance.uml_class_name);
      this.modellingToolkit.setDataProperty(tempNodedata, 'uml_class_property', this.uml_class_instance.uml_class_property);
      this.modellingToolkit.setDataProperty(tempNodedata, 'uml_class_attributes', this.uml_class_instance.uml_class_attributes);
      this.modellingToolkit.setDataProperty(tempNodedata, 'uml_class_operations', this.uml_class_instance.uml_class_operations);
      this.modellingToolkit.commitTransaction('update node', this.uml_class_instance.id);
    this.parentComponent.close();
  }
  /**
   * Deletes the entity
   */
  public delete(): void {
    const tempNodedata = this.modellingToolkit.findNodeDataForKey(this.nodedata.key);
    this.modellingToolkit.startTransaction('remove node', this.uml_class_instance.id);
    this.modellingToolkit.removeNodeData(tempNodedata);
    this.modellingToolkit.commitTransaction('remove node', this.uml_class_instance.id);
    this.parentComponent.close();
  }

  /**
   * Adds an attribute row to the form
   */
  addAttribute() {
    this.uml_class_instance.uml_class_attributes.push(new UmlClassAttributes(null, null, null, null,  false ));
  }

  /**
   * deletes an attribute row from the form
   * @param index - The rows index
   */
  deleteAttribute(index: number) {
    this.uml_class_instance.uml_class_attributes.splice(index, 1);
  }

  /**
   * Adds an operation row to the form
   */
  addOperation() {
    this.uml_class_instance.uml_class_operations.push(new UmlClassOperations(null, null, [new UmlClassOperationsParameters(null, null)], null, false));
  }

  /**
   * Deletes an operation row from the form
   * @param index - The rows index
   */
  deleteOperation(index: number) {
    this.uml_class_instance.uml_class_operations.splice(index, 1);
  }

  /**
   * Adds a parameter row to an operation row
   * @param index - The operations row index
   */
    addOperationParameter(index: number) {
        this.uml_class_instance.uml_class_operations[index].uml_class_operations_parameters.push(new UmlClassOperationsParameters('', ''));
  }

  /**
   * Deletes a parameter row from an operation row
   * @param index The index of the operation row
   * @param index2 The index of the parameter row
   */
  deleteOperationParameter(index: number, index2: number) {
      this.uml_class_instance.uml_class_operations[index].uml_class_operations_parameters.splice(index2, 1);
  }


}
