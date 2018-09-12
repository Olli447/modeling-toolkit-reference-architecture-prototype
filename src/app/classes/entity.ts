export interface Entity {
    id: string;
    name: string;
    category: string;

    variables: Variable[];
}

export class Variable {
    name: string;
    type: string;
    regex_constraint: string;
}
