import {Relation} from '../../classes/relation';
import {Entity} from '../../classes/entity';
import {SimpleCardinality} from '../../classes/cardinality';
import {Variable} from '../../classes/variable';

export class IsAggregationOf implements Relation {
    id: string;
    name: string;
    desciption: string;
    cardinalities: [{ fromEntity: Entity; toEntity: Entity; cardinality: SimpleCardinality }];
    variables: Variable[];

    imagePath: string;
    template: object;

}
