import * as go from 'gojs';
import {AbstractRelation} from './abstractRelation';

/** Abstract Class every CheckHandler must inherit from. Is used by the ContentCheckManagerService to call the CheckHandlers */
export abstract class AbstractCheckHandler {

    /** Method that is called by the ContentCheckManagerService for every registered CheckHandler.
     *  For now just checks on relations are Supported. More can be added if necessary.
     *  @param diagram - The Diagram the modelling tool operates on
     *  @param relation - The RelationClass the check shall be run on (used for valid cardinalities etc.)
     *  @param relationInstance - The actual diagram element. Contains all data for the passed relation element in accordance with the go.Model structure
     *  @return CheckReturn - standardized return message that is returned to the ContentCheckManager
     *  */
    abstract check(diagram: go.Diagram, relation: AbstractRelation, relationInstance: any): CheckReturn;
}

/** This interface is used as structure for returned data from checkHandlers.
 *  It contains a boolean that determines if the check failed. If it failed an additional error message is provided.
 *  When there is no error the errorMsg has to be null.
 *  */
export interface CheckReturn {
    isFailed: boolean;
    errorMsg: string;
}

/** CheckHandlerArray is a dictionary that is used in the Language data structure */
export interface CheckHandlerArray {
    [key: string]: AbstractCheckHandler[];
}
