import { Component, OnInit } from '@angular/core';
import {Language} from '../../classes/language';
import {ModellingManagerService} from '../../core/modelling-manager.service';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {
    languages: Language[];

  constructor(public modellingManager: ModellingManagerService) {
      this.languages = modellingManager.languages;
  }

    ngOnInit() {
    }
}
