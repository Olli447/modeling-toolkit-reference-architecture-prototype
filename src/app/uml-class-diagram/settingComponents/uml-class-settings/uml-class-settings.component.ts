import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SettingComponent, SettingItem} from '../../../classes/settingItem';
import {UmlClassInstance} from '../../entities/class';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {SettingsSidebarComponent} from '../../../frontend/modelling/settings-sidebar/settings-sidebar.component';
import {MatButton} from '@angular/material';
import {UmlClassAttributes} from '../../classes/property';
import {UmlClassOperations, UmlClassOperationsParameters} from '../../classes/operation';
import {HelperFunctions} from '../../../classes/helperFunctions';

@Component({
  selector: 'app-uml-class-settings',
  templateUrl: './uml-class-settings.component.html',
  styleUrls: ['./uml-class-settings.component.scss']
})
export class UmlClassSettingsComponent implements OnInit, SettingComponent, AfterViewInit {

  parentComponent: SettingsSidebarComponent = this.modellingToolkit.settingSidebarComponent;
  data: any;
  nodedata: any;
  uml_class_instance: UmlClassInstance;

  @ViewChild('submitClassForm') button: MatButton;

  ngAfterViewInit() {
      this.button.focus();
  }

  trackByIndex(index: number, obj: any): any {
        return index;
  }

  constructor(
      private modellingToolkit: ModellingToolkitService
  ) { }

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

  onSubmit() {
    const tempNodedata = this.modellingToolkit.modellingAreaComponent.diagram.model.findNodeDataForKey(this.nodedata.key);
    const diagram = this.modellingToolkit.modellingAreaComponent.diagram;
    diagram.startTransaction('update node:' + this.uml_class_instance.id);
      diagram.model.setDataProperty(tempNodedata, 'uml_class_keyword', this.uml_class_instance.uml_class_keyword);
      diagram.model.setDataProperty(tempNodedata, 'name', this.uml_class_instance.uml_class_name);
      diagram.model.setDataProperty(tempNodedata, 'uml_class_name', this.uml_class_instance.uml_class_name);
      diagram.model.setDataProperty(tempNodedata, 'uml_class_property', this.uml_class_instance.uml_class_property);
      diagram.model.setDataProperty(tempNodedata, 'uml_class_attributes', this.uml_class_instance.uml_class_attributes);
      diagram.model.setDataProperty(tempNodedata, 'uml_class_operations', this.uml_class_instance.uml_class_operations);
    diagram.commitTransaction('update node:' + this.uml_class_instance.id);
    this.parentComponent.close();
  }

  public delete(): void {
    const tempNodedata = this.modellingToolkit.modellingAreaComponent.diagram.model.findNodeDataForKey(this.nodedata.key);
    const diagram = this.modellingToolkit.modellingAreaComponent.diagram;
    diagram.startTransaction('remove node:' + this.uml_class_instance.id);
    diagram.model.removeNodeData(tempNodedata);
    diagram.commitTransaction('remove node:' + this.uml_class_instance.id);
    this.parentComponent.close();
  }

  addAttribute() {
    this.uml_class_instance.uml_class_attributes.push(new UmlClassAttributes(null, null, null, null,  false ));
  }
  deleteAttribute(index: number) {
    this.uml_class_instance.uml_class_attributes.splice(index, 1);
  }

  addOperation() {
    this.uml_class_instance.uml_class_operations.push(new UmlClassOperations(null, null, [new UmlClassOperationsParameters(null, null)], null, false));
  }
  deleteOperation(index: number) {
    this.uml_class_instance.uml_class_operations.splice(index, 1);
  }

    addOperationParameter(index: number) {
        this.uml_class_instance.uml_class_operations[index].uml_class_operations_parameters.push(new UmlClassOperationsParameters('', ''));
}
    deleteOperationParameter(index: number, index2: number) {
        this.uml_class_instance.uml_class_operations[index].uml_class_operations_parameters.splice(index2, 1);
    }


}
