import {Entity} from './entity';
import {SimpleCardinality} from './cardinality';
import {AbstractElement} from './abstractElement';
import {Variable} from './variable';

export interface Relation extends AbstractElement {
    // name: string;
    id: string;
    desciption: string;

    cardinalities: [{fromEntity: Entity, toEntity: Entity, cardinality: SimpleCardinality}];
    variables: Variable[];

    // imagePath: string;
}

export interface RelationInstance {
    fromID: string;
    toID: string;
    name: string;
}

