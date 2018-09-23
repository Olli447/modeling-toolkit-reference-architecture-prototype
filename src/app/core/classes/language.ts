import {AbstractEntity} from './abstractEntity';
import {AbstractRelation} from './abstractRelation';
import {UmlClassSettingsComponent} from '../../uml-class-diagram/settingComponents/uml-class-settings/uml-class-settings.component';
import {Type} from '@angular/core';
import {AbstractCheckHandler, CheckHandlerArray} from './abstractCheckHandler';
import {Component} from '@angular/core/src/metadata/directives';

/**This class provides the structure for a modelling language.
 *
 * A language consists of attributes. These attributes can be divided into 2 groups of 4 elements.
 * The first group:
 * - id: Unique identifier for the language
 * - name: The name of the language
 * - acronym: For example the short form a the language
 * - description: Discription for the language
 *
 * These attributes are displayed in the language selection process
 * The following attributes in the second group are used in the modelling tool:
 * - entities: Array that contains all entities of the language. The classes must implement AbstractEntity
 * - relations: Array that contains all relations of the language. The classes must implement AbstractRelation
 * - settingComponents: Object that contains all Components for entities and relations that need attributes. The object works like a dictionary where the key is the unique id of the entity/relation they belong to
 * - checkHandlerArray: Object that works as a Dictionary. The key is the unique id of the entity/relation. The value is an array that consists of CheckHandlers (these will be called in order)*/
export class Language {
    id: string;
    name: string;
    acronym: string;
    description: string;

    entities: AbstractEntity[];
    relations: AbstractRelation[];
    settingComponents: SettingComponentArray;
    checkHandlers: CheckHandlerArray;


    constructor(
        id: string,
        name: string,
        entities: AbstractEntity[],
        relations: AbstractRelation[],
        settingsComponents: SettingComponentArray,
        checkHandlers: CheckHandlerArray,
        acronym?: string, description?: string
    ) {
        this.id = id;
        this.name = name;
        this.settingComponents = settingsComponents;
        this.checkHandlers = checkHandlers;
        if (acronym) {
            this.acronym = acronym;
        }
        if (description) {
            this.description = description;
        }

        this.entities = entities;
        this.relations = relations;
    }
}

export interface SettingComponentArray {
    [key: string]: Type<any>;
}
