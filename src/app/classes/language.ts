import {Entity} from './entity';
import {Relation} from './relation';
import {UmlClassSettingsComponent} from '../uml-class-diagram/settingComponents/uml-class-settings/uml-class-settings.component';
import {Type} from '@angular/core';
import {CheckHandlerArray} from './abstractCheckHandler';

export class Language {
    id: string;
    name: string;
    acronym: string;
    description: string;

    entities: Entity[];
    relations: Relation[];
    settingComponents: { [key: string ]: Type<any> ; };
    checkHandlers: CheckHandlerArray;


    constructor(
        id: string,
        name: string,
        entities: Entity[],
        relations: Relation[],
        settingsComponents: { [key: string ]: Type<any> ; },
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
