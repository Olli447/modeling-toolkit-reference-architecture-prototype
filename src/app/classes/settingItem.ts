import {Type} from '@angular/core';
import {SettingsSidebarComponent} from '../frontend/modelling/settings-sidebar/settings-sidebar.component';

export class SettingItem {
    component: Type<any>;
    data: any;

    constructor(component: Type<any>, data: any) {
        this.component = component;
        this.data = data;
    }
}

export interface SettingComponent {
    parentComponent: SettingsSidebarComponent;
    data: any;
}

