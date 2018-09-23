import {ModellingComponent} from './modelling.component';
import {CanDeactivate} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
/**
 * This class is called by the router to check if he should be allowed leave the modelling component
 * */
export class CanDeactivateGuard implements CanDeactivate<ModellingComponent> {
    canDeactivate(component: ModellingComponent): boolean {

        if (component.hasUnsavedData()) {
            return confirm('You have unsaved changes! If you leave, your changes will be lost.');
        }
        return true;
    }
}
