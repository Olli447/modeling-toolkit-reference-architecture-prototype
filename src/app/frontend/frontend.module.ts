import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectionComponent } from './language-selection/language-selection.component';
import { LanguageComponent } from './language-selection/language/language.component';
import { ModellingComponent } from './modelling/modelling.component';
import { NoLanguageSelectedComponent } from './no-language-selected/no-language-selected.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatMenuModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppComponent} from '../app.component';
import {LayoutModule} from '@angular/cdk/layout';
import { HeaderComponent } from './language-selection/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  declarations: [
      LanguageSelectionComponent,
      LanguageComponent,
      ModellingComponent,
      NoLanguageSelectedComponent,
      HeaderComponent
  ]
})
export class FrontendModule { }
