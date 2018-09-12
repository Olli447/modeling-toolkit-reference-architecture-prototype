import {Entity} from './entity';
import {SimpleCardinality} from './cardinality';

export interface Relation {
    name: string;
    desciption: string;

    cardinalities: {fromEntity: Entity, toEntity: Entity, cardinality: SimpleCardinality};
}

