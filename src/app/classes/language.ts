import {Entity} from './entity';
import {Relation} from './relation';

export class Language {
    id: string;
    name: string;
    acronym: string;
    description: string;

    entities: Entity[];
    relations: Relation[];

    constructor(id: string, name: string, entities: Entity[], relations: Relation[], acronym?: string, description?: string) {
        this.id = id;
        this.name = name;
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
