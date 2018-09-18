import {Relation} from '../../core/classes/relation';
import {Entity} from '../../core/classes/entity';
import {SimpleCardinality} from '../../core/classes/cardinality';
import {Variable} from '../../core/classes/variable';
import {UmlClass} from '../entities/class';
import * as go from 'gojs';

export class UmlHasAttached implements Relation {
    id: string;
    name: string;
    desciption: string;
    cardinalities: [{ fromEntity: Entity; toEntity: Entity; cardinality: SimpleCardinality }];
    variables: Variable[];

    imagePath: string;
    template: object;

    private $ = go.GraphObject.make;

    constructor() {
        this.id = 'uml_hasAttached';
        this.name = 'Has Attached';
        this.cardinalities =
            [
                {
                    fromEntity: new UmlClass(),
                    toEntity: new UmlClass(),
                    cardinality: new SimpleCardinality({
                        min: '1',
                        max: 'n'
                    }, {
                        min: '1',
                        max: '1'
                    })
                }
            ];
        this.imagePath = '../../assets/uml/uml-has_attached.svg';
        this.template =
            this.$(go.Link, {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver
                },
                this.$(go.Shape, {
                    strokeDashArray: [3, 2]
                }),
            );
    }
}
