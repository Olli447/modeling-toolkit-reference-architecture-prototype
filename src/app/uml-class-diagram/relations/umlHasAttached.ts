import {AbstractRelation} from '../../core/classes/abstractRelation';
import {AbstractEntity} from '../../core/classes/abstractEntity';
import {SimpleCardinality} from '../../core/classes/cardinality';
import {Variable} from '../../core/classes/variable';
import {UmlClass} from '../entities/class';
import * as go from 'gojs';

/**
 * This class represents a  UML Has Attached relation
 */
export class UmlHasAttached implements AbstractRelation {
    id: string;
    name: string;
    desciption: string;
    cardinalities: [{ fromEntity: AbstractEntity; toEntity: AbstractEntity; cardinality: SimpleCardinality }];
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
