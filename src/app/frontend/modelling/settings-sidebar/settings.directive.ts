import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appSettings]'
})
export class SettingsDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
