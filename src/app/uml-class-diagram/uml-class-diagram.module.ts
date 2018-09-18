import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModellingManagerService} from '../core/modelling-manager.service';
import {Language} from '../core/classes/language';
import {UmlClass} from './entities/class';
import { UmlClassSettingsComponent } from './settingComponents/uml-class-settings/uml-class-settings.component';
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
import { UmlAssociationSettingsComponent } from './settingComponents/uml-association-settings/uml-association-settings.component';
import {UmlAssociation} from './relations/umlAssociation';
import {UmlGeneralization} from './relations/umlGeneralization';
import {UmlHasAttached} from './relations/umlHasAttached';
import { UmlIsCompositionOfSettingsComponent } from './settingComponents/uml-is-composition-of-settings/uml-is-composition-of-settings.component';
import {UmlIsCompositionOf} from './relations/umlIsCompositionOf';
import { UmlIsAggregationOfSettingsComponent } from './settingComponents/uml-is-aggregation-of-settings/uml-is-aggregation-of-settings.component';
import {UmlIsAggregationOf} from './relations/umlIsAggregationOf';
import {CheckHandlerArray} from '../core/classes/abstractCheckHandler';
import {BasicCheckHandler} from './checkHandlers/basicCheckHandler';
import {QuantityCheckHandler} from './checkHandlers/quantityCheckHandler';

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
  declarations: [UmlClassSettingsComponent, UmlAssociationSettingsComponent, UmlIsCompositionOfSettingsComponent, UmlIsAggregationOfSettingsComponent],
  entryComponents: [UmlClassSettingsComponent, UmlAssociationSettingsComponent, UmlIsCompositionOfSettingsComponent, UmlIsAggregationOfSettingsComponent],
  exports: [UmlClassSettingsComponent, UmlAssociationSettingsComponent, UmlIsCompositionOfSettingsComponent, UmlIsAggregationOfSettingsComponent]
})
export class UmlClassDiagramModule {

  language: Language;
  constructor(public modellingManager: ModellingManagerService) {
    const entities = [
        new UmlClass()
    ];
    const relations = [
        new UmlAssociation(),
        new UmlGeneralization(),
        new UmlHasAttached(),
        new UmlIsCompositionOf(),
        new UmlIsAggregationOf()
    ];
    const settingsComponents = {
      'uml_class': UmlClassSettingsComponent,
      'uml_association': UmlAssociationSettingsComponent,
      'uml_isCompositionOf': UmlIsCompositionOfSettingsComponent,
      'uml_isAggregationOf': UmlIsAggregationOfSettingsComponent
    };
    const checkHandlers: CheckHandlerArray = {
        'uml_isCompositionOf': [
            new BasicCheckHandler(),
            new QuantityCheckHandler()
        ],
        'uml_isAggregationOf': [
            new BasicCheckHandler(),
            new QuantityCheckHandler()
        ],
        'uml_generalization': [
            new BasicCheckHandler(),
            new QuantityCheckHandler()
        ],
    };

    this.language = new Language(
        'uml-classdiagram',
        'UML Class Diagram',
        entities,
        relations,
        settingsComponents,
        checkHandlers,
        'UML',
        'This is the Unified Modelling Language Class Diagram'
    );

    modellingManager.addLanguage(this.language);
  }
}
