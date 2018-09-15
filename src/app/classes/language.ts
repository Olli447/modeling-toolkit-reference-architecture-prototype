import {Entity} from './entity';
import {Relation} from './relation';
import {UmlClassSettingsComponent} from '../uml-class-diagram/uml-class-settings/uml-class-settings.component';
import {Type} from '@angular/core';

export class Language {
    id: string;
    name: string;
    acronym: string;
    description: string;

    entities: Entity[];
    relations: Relation[];
    settingComponents: { [key: string ]: Type<any> ; };

    constructor(
        id: string,
        name: string,
        entities: Entity[],
        relations: Relation[],
        settingsComponents: { [key: string ]: Type<any> ; },
        acronym?: string, description?: string
    ) {
        this.id = id;
        this.name = name;
        this.settingComponents = settingsComponents;
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
