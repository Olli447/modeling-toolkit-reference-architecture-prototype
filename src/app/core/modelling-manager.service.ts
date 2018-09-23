import { Injectable } from '@angular/core';
import {Language} from './classes/language';

@Injectable({
  providedIn: 'root'
})

/**
 * This Service holds all available languages and provides one if requested.
 * On application startup all languages will register itself via the {@link addLanguage} method.
 * */
export class ModellingManagerService {
  languages: Language[];
  rawModelData: string;

  constructor() {
      this.languages = [];
  }

  /**
   * Adds a language to the languages array
   * */
  addLanguage(language: Language) {
    this.languages.push(language);
  }

  /**
   * Returns an specific Language to the caller
   * @param id The unique id of the language to be returned
   * @return Language The found language or null
   * */
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

