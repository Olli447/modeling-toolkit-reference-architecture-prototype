import {AbstractRelation} from '../../core/classes/abstractRelation';
import {AbstractEntity} from '../../core/classes/abstractEntity';
import {SimpleCardinality} from '../../core/classes/cardinality';
import {Variable} from '../../core/classes/variable';
import * as go from 'gojs';
import {UmlClass} from '../entities/class';

/**
 * This class represents a UML Is Composition Of relation
 */
export class UmlIsCompositionOf implements AbstractRelation {
    id: string;
    name: string;
    desciption: string;
    cardinalities: [{ fromEntity: AbstractEntity; toEntity: AbstractEntity; cardinality: SimpleCardinality }];
    variables: Variable[];

    imagePath: string;
    template: object;

    private $ = go.GraphObject.make;

    constructor() {
        this.id = 'uml_isCompositionOf';
        this.name = 'Is Composition Of';
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
        this.imagePath = '../../assets/uml/uml-is_composition_of.png';
        this.template =
            this.$(go.Link, {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver
                },
                this.$(go.Shape),
                this.$(go.Shape,
                    {
                        fromArrow: 'Diamond',
                        fill: 'black',
                        scale: 1.2,
                        strokeWidth: 0.6
                    }
                ),
                this.$(go.TextBlock, {
                        // segmentOffset: new go.Point(0, -10),
                        // segmentOrientation: go.Link.OrientUpright,
                        alignmentFocus: new go.Spot(0, 0, -2, 15),
                        textAlign: 'center',
                        stroke: '#000',
                        isMultiline: false,
                    },
                    new go.Binding('text', 'uml_isCompositionOf_name')
                ),
                this.$(go.TextBlock, 'to', {
                        segmentIndex: -2,
                        segmentFraction: 0.3,
                        segmentOffset: new go.Point(0, -15)
                    },
                    new go.Binding('text', 'uml_isCompositionOf_cardinality', function (value: SimpleCardinality) {
                        return value.to.min + '..' + value.to.max;
                    })
                )
            );

    }

}

export class UmlIsCompositionOfInstance {
    constructor(
        public uml_isCompositionOf_name: string,
        public uml_isCompositionOf_cardinality: SimpleCardinality,
    ) {

    }
}
