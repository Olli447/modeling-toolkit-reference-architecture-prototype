import {AbstractCheckHandler, CheckReturn} from '../../core/classes/abstractCheckHandler';
import * as go from 'gojs';
import {AbstractRelation} from '../../core/classes/abstractRelation';

/**
 * The BasicCheckHandler checks if the relation is allowed between two entities
 * */
export class BasicCheckHandler extends AbstractCheckHandler {
    check(diagram: go.Diagram, relation: AbstractRelation, relationInstance: any): CheckReturn {
        const from: go.Node = diagram.findNodeForKey(relationInstance.from);
        const to: go.Node = diagram.findNodeForKey(relationInstance.to);

        let returnValue: CheckReturn = {
            isFailed: true,
            errorMsg: 'This relation cannot be created between ' + from.data.name + ' and ' + to.data.name + ' !'
        };

        // create exmaple data to be able to look for existing links
        const exampleData = {
            from: relationInstance.from,
            to: relationInstance.to,
            category: relation.id
        };

        // Iterate through the allowed relations and check if the desired relationship is allowed
        for (let i = 0; i < relation.cardinalities.length; i++) {
            const cardinality = relation.cardinalities[i];
            if (cardinality.fromEntity.id === from.data.category || cardinality.toEntity.id === to.data.category) {
                returnValue = {
                    isFailed: false,
                    errorMsg: null
                };
            } else {
                if (cardinality.fromEntity.id === to.data.category || cardinality.toEntity.id === from.data.category) {
                    // if isFailed is true once don't change it
                    if (returnValue.isFailed) {
                        returnValue = {
                            isFailed: true,
                            errorMsg: 'This relation can be created only between ' + to.data.name + ' and ' + from.data.name + ' !'
                        };
                    }
                }
            }
        }
        return returnValue;
    }

}
