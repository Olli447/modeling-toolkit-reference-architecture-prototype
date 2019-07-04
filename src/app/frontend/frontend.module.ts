import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectionComponent } from './language-selection/language-selection.component';
import {LanguageComponent, LanguageLoadDialog} from './language-selection/language/language.component';
import { ModellingComponent } from './modelling/modelling.component';
import { NoLanguageSelectedComponent } from './no-language-selected/no-language-selected.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LayoutModule} from '@angular/cdk/layout';
import { HeaderComponent } from './language-selection/header/header.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToolbarComponent } from './modelling/toolbar/toolbar.component';
import { ElementsSidebarComponent } from './modelling/elements-sidebar/elements-sidebar.component';
import { SettingsSidebarComponent } from './modelling/settings-sidebar/settings-sidebar.component';
import { ModellingAreaComponent } from './modelling/modelling-area/modelling-area.component';
import {CanDeactivateGuard} from './modelling/canDeactivateGuard';
import { ElementEntityComponent } from './modelling/elements-sidebar/element-entity/element-entity.component';
import {ElementRelationComponent} from './modelling/elements-sidebar/element-relation/element-relation.component';
import { SettingsDirective } from './modelling/settings-sidebar/settings.directive';
import { ElementRelationSelectionComponent } from './modelling/elements-sidebar/element-relation-selection/element-relation-selection.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
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
    LayoutModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSnackBarModule
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
      ModellingAreaComponent,
      ElementEntityComponent,
      ElementRelationComponent,
      SettingsDirective,
      ElementRelationSelectionComponent,
  ],
  entryComponents: [LanguageLoadDialog],
  exports: [LoadingScreenComponent],
  providers: [CanDeactivateGuard]
})
export class FrontendModule { }
