import {Entity} from './entity';
import {SimpleCardinality} from './cardinality';
import {AbstractElement} from './abstractElement';
import {Variable} from './variable';

export interface Relation extends AbstractElement {
    // name: string;
    id: string;
    desciption: string;

    cardinalities: [CardinalityElement];
    variables: Variable[];

    // imagePath: string;
}

export interface RelationInstance {
    from: string;
    to: string;
    key: string;
}

export interface CardinalityElement {
    fromEntity: Entity;
    toEntity: Entity;
    cardinality: SimpleCardinality;
}

