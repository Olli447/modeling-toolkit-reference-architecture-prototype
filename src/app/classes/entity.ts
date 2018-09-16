import {AbstractElement} from './abstractElement';
import {Variable} from './variable';

export interface Entity extends AbstractElement {
    id: string;
    // name: string;

    variables: Variable[];
    // imagePath: string;
}

export interface EntityInstance {
    id: string;
    name: string;
}
