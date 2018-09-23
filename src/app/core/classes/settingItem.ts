import {Type} from '@angular/core';
import {SettingsSidebarComponent} from '../../frontend/modelling/settings-sidebar/settings-sidebar.component';

/**This interface is used for the interaction between the {@link SettingSidebarComponent} and the appropriate loaded component from the settingComponents Array in {@link Language}*/
export class SettingItem {
    component: Type<any>;
    data: any;

    constructor(component: Type<any>, data: any) {
        this.component = component;
        this.data = data;
    }
}

/**This is the interface every component, that will be loaded into the setting sidebar, needs to implement in order to receive the contents of the {@link SettingItem} */
export interface SettingComponent {
    parentComponent: SettingsSidebarComponent;
    data: any;
}

