import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingScreenService} from './loading-screen.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [LoadingScreenService]
})
export class ServiceModule {
  constructor(@Optional() @SkipSelf() service: ServiceModule) {
    if (service) {
      throw new Error('The Service Module has already been imported');
    }
  }
}
