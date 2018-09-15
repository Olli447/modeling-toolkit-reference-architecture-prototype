import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModellingManagerService} from '../core/modelling-manager.service';
import {Language} from '../classes/language';
import {UmlClass} from './entities/class';
import { UmlClassSettingsComponent } from './uml-class-settings/uml-class-settings.component';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatDialogModule, MatDividerModule,
    MatFormFieldModule,
    MatGridListModule, MatIconModule, MatInputModule,
    MatMenuModule, MatProgressBarModule,
    MatSelectModule, MatSidenavModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import { UmlAssociationSettingsComponent } from './uml-association-settings/uml-association-settings.component';
import {UmlAssociation} from './relations/umlAssociation';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      LayoutModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
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
      MatCheckboxModule
  ],
  declarations: [UmlClassSettingsComponent, UmlAssociationSettingsComponent],
  entryComponents: [UmlClassSettingsComponent, UmlAssociationSettingsComponent],
  exports: [UmlClassSettingsComponent, UmlAssociationSettingsComponent]
})
export class UmlClassDiagramModule {

  language: Language;
  constructor(public modellingManager: ModellingManagerService) {
    const entities = [
        new UmlClass()
    ];
    const relations = [
        new UmlAssociation()
    ];
    const settingsComponents = {
      'uml_class': UmlClassSettingsComponent,
      'uml_association': UmlAssociationSettingsComponent,
    };

    this.language = new Language(
        'uml-classdiagram',
        'UML Class Diagram',
        entities,
        relations,
        settingsComponents,
        'UML',
        'This is the Unified Modelling Language Class Diagram'
    );

    modellingManager.addLanguage(this.language);
  }
}
