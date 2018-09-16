import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModellingManagerService} from './modelling-manager.service';
import {ModellingToolkitService} from './modelling-toolkit.service';
import {ContentCheckManagerService} from './content-check-manager.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
      ModellingManagerService,
      ModellingToolkitService,
      ContentCheckManagerService
  ]
})
export class CoreModule { }
