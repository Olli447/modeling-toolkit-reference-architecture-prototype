import { Component, OnInit } from '@angular/core';
import {Language} from '../../classes/language';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {
    languages: Language[];

  constructor() {
      this.languages = [
          new Language('1', 'UML class diagram', null, null, 'UML',  'Dies ist ein Test'),
          new Language('2', 'MEMO Organisation Modelling Language', null, null, 'OrgML',  'Dies ist ein Test'),
          new Language('3', 'Test3', null, null, null,  'Dies ist ein Test'),
          new Language('4', 'Test4', null, null, null,  'Dies ist ein Test'),
          new Language('5', 'Test5', null, null, null,  'Dies ist ein Test'),
          new Language('6', 'Test6', null, null, null,  'Dies ist ein Test'),
      ];
  }

    ngOnInit() {
    }
}
