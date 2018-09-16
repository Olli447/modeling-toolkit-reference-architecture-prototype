import {Relation} from '../../classes/relation';
import {Entity} from '../../classes/entity';
import {SimpleCardinality} from '../../classes/cardinality';
import {Variable} from '../../classes/variable';
import * as go from 'gojs';
import {UmlClass} from '../entities/class';

export class UmlIsAggregationOf implements Relation {
    id: string;
    name: string;
    desciption: string;
    cardinalities: [{ fromEntity: Entity; toEntity: Entity; cardinality: SimpleCardinality }];
    variables: Variable[];

    imagePath: string;
    template: object;
    private $ = go.GraphObject.make;

    constructor() {
        this.id = 'uml_isAggregationOf';
        this.name = 'Is Aggregation Of';
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
        this.imagePath = 'assets/uml/uml-is_aggregation_of.png';
        this.template =
            this.$(go.Link, {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver
                },
                this.$(go.Shape),
                this.$(go.Shape,
                    {
                        fromArrow: 'Diamond',
                        fill: 'white',
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
                    new go.Binding('text', 'uml_isAggregationOf_name')
                ),
                this.$(go.TextBlock, 'to', {
                        segmentIndex: -2,
                        segmentFraction: 0.3,
                        segmentOffset: new go.Point(0, -15)
                    },
                    new go.Binding('text', 'uml_isAggregationOf_cardinality', function (value: SimpleCardinality) {
                        return value.to.min + '..' + value.to.max;
                    })
                )
            );

    }

}

export class UmlIsAggregationOfInstance {
    constructor(
        public uml_isAggregationOf_name: string,
        public uml_isAggregationOf_cardinality: SimpleCardinality,
    ) {

    }
}
