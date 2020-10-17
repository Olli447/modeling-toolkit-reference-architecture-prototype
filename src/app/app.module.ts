import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrontendModule } from './frontend/frontend.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ServiceModule} from './service/service.module';
import {UmlClassDiagramModule} from './uml-class-diagram/uml-class-diagram.module';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FrontendModule,
    CoreModule,
    ServiceModule,
    UmlClassDiagramModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [UmlClassDiagramModule]
})
export class AppModule { }
