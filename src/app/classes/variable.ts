import {t} from '@angular/core/src/render3';

export class Variable {
    id: string;
    name: string;
    type: VariableType;
    regex_constraint: string;
    regex_hint: string;

    sub_variable: Variable[];

    constructor(id: string,
                name: string,
                type: VariableType,
                regex_constraint?: string,
                regex_hint?: string,
                enum_content?: string[],
                sub_variable?: Variable[]) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.regex_constraint = regex_constraint;
        this.regex_hint = regex_hint;
        this.sub_variable = sub_variable;
    }
}

export enum VariableType {
    TEXT,
    NUMBER,
    CHECKBOX,
    ENUMERATION,
    COMPOSED_SINGLE,
    COMPOSED_MULTIPLE
}

