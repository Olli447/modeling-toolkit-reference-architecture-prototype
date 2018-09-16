import {Relation} from '../../classes/relation';
import {Entity} from '../../classes/entity';
import {SimpleCardinality} from '../../classes/cardinality';
import {Variable} from '../../classes/variable';
import {UmlClass} from '../entities/class';
import * as go from 'gojs';

export class UmlGeneralization implements Relation {
    id: string;
    name: string;
    desciption: string;
    cardinalities: [{ fromEntity: Entity; toEntity: Entity; cardinality: SimpleCardinality }];
    variables: Variable[];

    imagePath: string;
    template: object;

    private $ = go.GraphObject.make;

    constructor() {
        this.id = 'uml_generalization';
        this.name = 'Generalization';
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
        this.imagePath = 'assets/uml/uml-generalization.svg';

        this.template =
            this.$(go.Link, {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver
                },
                this.$(go.Shape),
                this.$(go.Shape,
                    {
                        toArrow: 'Triangle',
                        fill: 'white',
                        scale: 2,
                        strokeWidth: 0.6
                    }
                )
            );
    }

}
