import { Injectable } from '@angular/core';
import {Language} from '../classes/language';

@Injectable({
  providedIn: 'root'
})
export class ModellingManagerService {
  languages: Language[];
  rawModelData: string;

  constructor() {
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

