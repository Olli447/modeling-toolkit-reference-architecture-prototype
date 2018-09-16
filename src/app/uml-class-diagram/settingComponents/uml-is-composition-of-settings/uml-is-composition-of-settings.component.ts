import {Component, OnInit, ViewChild} from '@angular/core';
import {SettingsSidebarComponent} from '../../../frontend/modelling/settings-sidebar/settings-sidebar.component';
import {MatButton} from '@angular/material';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {HelperFunctions} from '../../../classes/helperFunctions';
import {SimpleCardinality} from '../../../classes/cardinality';
import * as go from 'gojs';
import {UmlIsCompositionOfInstance} from '../../relations/umlIsCompositionOf';

@Component({
  selector: 'app-uml-is-composition-of-settings',
  templateUrl: './uml-is-composition-of-settings.component.html',
  styleUrls: ['./uml-is-composition-of-settings.component.scss']
})
export class UmlIsCompositionOfSettingsComponent implements OnInit {
    data: any;
    parentComponent: SettingsSidebarComponent = this.modellingToolkit.settingSidebarComponent;

    nodeData: any;
    uml_isCompositionOf_instance: UmlIsCompositionOfInstance;

    @ViewChild('submitCompositionForm') button: MatButton;
    constructor(
        private modellingToolkit: ModellingToolkitService
    ) { }

    ngOnInit() {
        const helper = new HelperFunctions();
        this.nodeData = helper.deepCopy(this.data);
        this.uml_isCompositionOf_instance = new UmlIsCompositionOfInstance(
            this.nodeData.uml_isCompositionOf_name,
            this.nodeData.uml_isCompositionOf_cardinality
        );
        if (!this.nodeData.uml_isCompositionOf_name) {
            this.uml_isCompositionOf_instance.uml_isCompositionOf_name = '';
        }
        if (!this.nodeData.uml_isCompositionOf_cardinality) {
            this.uml_isCompositionOf_instance.uml_isCompositionOf_cardinality = new SimpleCardinality(
                null,
                {
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
        diagram.model.setDataProperty(linkData, 'uml_isCompositionOf_name', this.uml_isCompositionOf_instance.uml_isCompositionOf_name);
        diagram.model.setDataProperty(linkData, 'uml_isCompositionOf_cardinality', this.uml_isCompositionOf_instance.uml_isCompositionOf_cardinality);
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

