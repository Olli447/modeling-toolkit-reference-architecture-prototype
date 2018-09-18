import * as go from 'gojs';
import {Relation} from './relation';

export abstract class AbstractCheckHandler {
    abstract check(diagram: go.Diagram, relation: Relation, relationInstance: any): CheckReturn;
}

export interface CheckReturn {
    isFailed: boolean;
    errorMsg: string;
}

export interface CheckHandlerArray {
    [key: string]: AbstractCheckHandler[];
}
