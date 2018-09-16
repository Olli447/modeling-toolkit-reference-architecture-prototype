import {Relation, RelationInstance} from '../../classes/relation';
import {Entity} from '../../classes/entity';
import {SimpleCardinality} from '../../classes/cardinality';
import {Variable} from '../../classes/variable';
import {UmlClass} from '../entities/class';
import * as go from 'gojs';

export class UmlAssociation implements Relation {
    id: string;
    name: string;
    desciption: string;
    cardinalities: [{ fromEntity: Entity; toEntity: Entity; cardinality: SimpleCardinality }];
    variables: Variable[];

    imagePath: string;
    template: object;

    private $ = go.GraphObject.make;

    constructor() {
        this.id = 'uml_association';
        this.name = 'Association';
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
                    max: 'n'
                })
            }
        ];
        this.imagePath = 'assets/uml/uml-association.svg';
        this.template =
            this.$(go.Link, {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver
            },
                this.$(go.Shape),
                this.$(go.TextBlock, 'from',  {
                    segmentIndex: 1,
                    segmentFraction: 0.3,
                    segmentOffset: new go.Point(0, -15)
                },
                    new go.Binding('text', 'uml_association_cardinality', function (value: SimpleCardinality) {
                        return value.from.min + '..' + value.from.max;
                    })
                ),
                this.$(go.Shape, {
                    // segmentOffset: new go.Point(0, -25),
                    // segmentOrientation: go.Link.OrientUpright,
                    alignmentFocus: new go.Spot(0, 0, -6, 25),
                    width: 10,
                    height: 7.5,
                    figure: 'TriangleRight',
                    fill: 'black',
                    stroke: 'black',
                }, new go.Binding('figure', 'uml_association_readingDirectionIsRight', function (value) {
                    if (value === true) {
                        return 'TriangleRight';
                    } else if (value === false) {
                        return 'TriangleLeft';
                    }
                })),
                this.$(go.TextBlock,  {
                    // segmentOffset: new go.Point(0, -10),
                    // segmentOrientation: go.Link.OrientUpright,
                    alignmentFocus: new go.Spot(0, 0, -2, 15),
                    textAlign: 'center',
                    stroke: '#000',
                    isMultiline: false,
                },
                    new go.Binding('text', 'uml_association_name')
                ),
                this.$(go.TextBlock, 'to', {
                    segmentIndex: -2,
                    segmentFraction: 0.3,
                    segmentOffset: new go.Point(0, -15)
                },
                    new go.Binding('text', 'uml_association_cardinality', function (value: SimpleCardinality) {
                        return value.to.min + '..' + value.to.max;
                    })
                )
            );



    }
}

export class UmlAssociationInstance {
    constructor(
        public uml_association_name: string,
        public uml_association_isDerived: boolean,
        public uml_association_visibility: string,
        public uml_association_readingDirectionIsRight: boolean,
        public uml_association_cardinality: SimpleCardinality
    ) {

    }
}

