import {Component, OnInit, ViewChild} from '@angular/core';
import {SettingsSidebarComponent} from '../../../frontend/modelling/settings-sidebar/settings-sidebar.component';
import {UmlIsAggregationOfInstance} from '../../relations/umlIsAggregationOf';
import {MatButton} from '@angular/material';
import {ModellingToolkitService} from '../../../core/modelling-toolkit.service';
import {HelperFunctions} from '../../../classes/helperFunctions';
import {SimpleCardinality} from '../../../classes/cardinality';
import * as go from 'gojs';

@Component({
  selector: 'app-uml-is-aggregation-of-settings',
  templateUrl: './uml-is-aggregation-of-settings.component.html',
  styleUrls: ['./uml-is-aggregation-of-settings.component.scss']
})
export class UmlIsAggregationOfSettingsComponent implements OnInit {
    data: any;
    parentComponent: SettingsSidebarComponent = this.modellingToolkit.settingSidebarComponent;

    nodeData: any;
    uml_isAggregationOf_instance: UmlIsAggregationOfInstance;

    @ViewChild('submitAggregationForm') button: MatButton;
    constructor(
        private modellingToolkit: ModellingToolkitService
    ) { }

    ngOnInit() {
        const helper = new HelperFunctions();
        this.nodeData = helper.deepCopy(this.data);
        this.uml_isAggregationOf_instance = new UmlIsAggregationOfInstance(
            this.nodeData.uml_isAggregationOf_name,
            this.nodeData.uml_isAggregationOf_cardinality
        );
        if (!this.nodeData.uml_isAggregationOf_name) {
            this.uml_isAggregationOf_instance.uml_isAggregationOf_name = '';
        }
        if (!this.nodeData.uml_isAggregationOf_cardinality) {
            this.uml_isAggregationOf_instance.uml_isAggregationOf_cardinality = new SimpleCardinality(
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
        diagram.model.setDataProperty(linkData, 'uml_isAggregationOf_name', this.uml_isAggregationOf_instance.uml_isAggregationOf_name);
        diagram.model.setDataProperty(linkData, 'uml_isAggregationOf_cardinality', this.uml_isAggregationOf_instance.uml_isAggregationOf_cardinality);
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
