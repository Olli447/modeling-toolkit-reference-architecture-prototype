import { Injectable } from '@angular/core';
import {Language} from '../classes/language';

@Injectable({
  providedIn: 'root'
})
export class ModellingManagerService {
  languages: Language[];
  rawModelData: string;

  constructor() {
      /*this.languages = [
          new Language('1', 'UML class diagram', null, null, 'UML',  'Dies ist ein Test'),
          new Language('2', 'MEMO Organisation Modelling Language', null, null, 'OrgML',  'Dies ist ein Test'),
          new Language('3', 'Test3', null, null, null,  'Dies ist ein Test'),
          new Language('4', 'Test4', null, null, null,  'Dies ist ein Test'),
          new Language('5', 'Test5', null, null, null,  'Dies ist ein Test'),
          new Language('6', 'Test6', null, null, null,  'Dies ist ein Test'),
      ];*/
      this.languages = [];
  }

  addLanguage(language: Language) {
    this.languages.push(language);
  }

  getLanguageByID(id: string): Language {
      return this.languages.find((element) => {
              if (element.id === id) {
                  return true;
              } else {
                  return false;
              }
          }
      );
  }
}

