import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectionComponent } from './language-selection/language-selection.component';
import {LanguageComponent, LanguageLoadDialog} from './language-selection/language/language.component';
import { ModellingComponent } from './modelling/modelling.component';
import { NoLanguageSelectedComponent } from './no-language-selected/no-language-selected.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule, MatProgressBarModule, MatSidenavModule, MatTooltipModule
} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LayoutModule} from '@angular/cdk/layout';
import { HeaderComponent } from './language-selection/header/header.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import {FormsModule} from '@angular/forms';
import { ToolbarComponent } from './modelling/toolbar/toolbar.component';
import { ElementsSidebarComponent } from './modelling/elements-sidebar/elements-sidebar.component';
import { SettingsSidebarComponent } from './modelling/settings-sidebar/settings-sidebar.component';
import { ModellingAreaComponent } from './modelling/modelling-area/modelling-area.component';
import {CanDeactivateGuard} from './modelling/canDeactivateGuard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    LayoutModule
  ],
  declarations: [
      LanguageSelectionComponent,
      LanguageComponent,
      LanguageLoadDialog,
      ModellingComponent,
      NoLanguageSelectedComponent,
      HeaderComponent,
      LoadingScreenComponent,
      ToolbarComponent,
      ElementsSidebarComponent,
      SettingsSidebarComponent,
      ModellingAreaComponent
  ],
  entryComponents: [LanguageLoadDialog],
  exports: [LoadingScreenComponent],
  providers: [CanDeactivateGuard]
})
export class FrontendModule { }
