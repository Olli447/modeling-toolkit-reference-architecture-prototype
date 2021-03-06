import {AbstractEntity, EntityInstance} from '../../core/classes/abstractEntity';
import {Variable, VariableType} from '../../core/classes/variable';
import * as go from 'gojs';
import {UmlClassOperations} from '../classes/operation';
import {UmlClassAttributes} from '../classes/property';

/**
 * This class represents a UML Class
 * */
export class UmlClass implements AbstractEntity {
    id: string;
    name: string;
    variables: Variable[];

    imagePath: string;
    template: object;

    private $ = go.GraphObject.make;


    constructor() {
        this.id = 'uml_class';
        this.name = 'Class';

        this.imagePath = '../../assets/uml/uml-class.svg';
        this.template =

            this.$(go.Node, 'Auto',
                {
                    locationSpot: go.Spot.Center,
                    fromSpot: go.Spot.AllSides,
                    toSpot: go.Spot.AllSides
                },
                new go.Binding('location', 'location').makeTwoWay(),
                this.$(go.Shape, { fill: 'lightyellow' }),
                this.$(go.Panel, 'Table',
                    { defaultRowSeparatorStroke: 'black' },
                    // header
                    this.$(go.TextBlock,
                        {
                            row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
                            font: 'bold 12pt sans-serif',
                            isMultiline: false, editable: true
                        },
                        new go.Binding('text', 'uml_class_name').makeTwoWay()),
                    // properties
                    this.$(go.Panel, 'Vertical', { name: 'PROPERTIES' },
                        new go.Binding('itemArray', 'uml_class_attributes'),
                        {
                            row: 1, margin: 3, stretch: go.GraphObject.Fill,
                            defaultAlignment: go.Spot.Left, background: 'lightyellow',
                            itemTemplate:
                                this.$(go.Panel, 'Horizontal',
                                    // property visibility/access
                                    this.$(go.TextBlock,
                                        { isMultiline: false, editable: false, width: 12 },
                                        new go.Binding('text', 'uml_class_attributes_visibility').makeTwoWay()),
                                    // property name, underlined if scope=='class' to indicate static property
                                    this.$(go.TextBlock,
                                        { isMultiline: false, editable: false },
                                        new go.Binding('text', 'uml_class_attributes_name').makeTwoWay(),
                                        new go.Binding('isUnderline', 'uml_class_attributes_isClassScope', function(s) { return s === true; })),
                                    // property type, if known
                                    this.$(go.TextBlock, '',
                                        new go.Binding('text', 'uml_class_attributes_type', function(t) { return (t ? ': ' : ''); })),
                                    this.$(go.TextBlock,
                                        { isMultiline: false, editable: false },
                                        new go.Binding('text', 'uml_class_attributes_type').makeTwoWay()),
                                    // property default value, if any
                                    this.$(go.TextBlock,
                                        { isMultiline: false, editable: false },
                                        new go.Binding('text', 'uml_class_attributes_value', function(s) { return s ? ' = ' + s : ''; })))
                        }
                    ),
                    // methods
                    this.$(go.Panel, 'Vertical', { name: 'METHODS' },
                        new go.Binding('itemArray', 'uml_class_operations'),
                        {
                            row: 2, margin: 3, stretch: go.GraphObject.Fill,
                            defaultAlignment: go.Spot.Left, background: 'lightyellow',
                            itemTemplate:
                                this.$(go.Panel, 'Horizontal',
                                    // method visibility/access
                                    this.$(go.TextBlock,
                                        { isMultiline: false, editable: false, width: 12 },
                                        new go.Binding('text', 'uml_class_operations_visibility')),
                                    // method name, underlined if scope=='class' to indicate static method
                                    this.$(go.TextBlock,
                                        { isMultiline: false, editable: false },
                                        new go.Binding('text', 'uml_class_operations_name').makeTwoWay(),
                                        new go.Binding('isUnderline', 'uml_class_operations_isClassScope', function(s) { return s === true; })),
                                    // method parameters
                                    this.$(go.TextBlock, '()',
                                        // this does not permit adding/editing/removing of parameters via inplace edits
                                        new go.Binding('text', 'uml_class_operations_parameters', function(parameters) {
                                            let s = '(';
                                            for (let i = 0; i < parameters.length; i++) {
                                                const param = parameters[i];
                                                if (!param.uml_class_operations_parameters_name || !param.uml_class_operations_parameters_type) {
                                                    return;
                                                }
                                                if (i > 0) { s += ', '; }
                                                s += param.uml_class_operations_parameters_name + ': ' + param.uml_class_operations_parameters_type;
                                            }
                                            return s + ')';
                                        })),
                                    // method return type, if any
                                    this.$(go.TextBlock, '',
                                        new go.Binding('text', 'uml_class_operations_returntype', function(t) { return (t ? ': ' : ''); })),
                                    this.$(go.TextBlock,
                                        { isMultiline: false, editable: false },
                                        new go.Binding('text', 'uml_class_operations_returntype').makeTwoWay()))
                        }
                    )
                )
                );
    }

}

export class UmlClassInstance implements EntityInstance {
    id: string;
    uml_class_keyword: string;
    uml_class_name: string;
    uml_class_property: string;
    uml_class_attributes: UmlClassAttributes[];
    uml_class_operations: UmlClassOperations[];

    constructor(id: string,
                uml_class_keyword: string,
                uml_class_name: string,
                uml_class_property: string,
                uml_class_attributes: UmlClassAttributes[],
                uml_class_operations: UmlClassOperations[]) {
        this.id = id;
        this.uml_class_keyword = uml_class_keyword;
        this.uml_class_name = uml_class_name;
        this.uml_class_property = uml_class_property;
        this.uml_class_attributes = uml_class_attributes;
        this.uml_class_operations = uml_class_operations;
    }

    get name(): string {
        return this.uml_class_name;
    }
}

