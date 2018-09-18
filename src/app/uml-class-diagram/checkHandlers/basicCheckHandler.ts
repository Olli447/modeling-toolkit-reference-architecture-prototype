import {AbstractCheckHandler, CheckReturn} from '../../core/classes/abstractCheckHandler';
import * as go from 'gojs';
import {Relation} from '../../core/classes/relation';

export class BasicCheckHandler extends AbstractCheckHandler {
    check(diagram: go.Diagram, relation: Relation, relationInstance: any): CheckReturn {
        const from: go.Node = diagram.findNodeForKey(relationInstance.from);
        const to: go.Node = diagram.findNodeForKey(relationInstance.to);

        let returnValue: CheckReturn = {
            isFailed: true,
            errorMsg: 'This relation cannot be created between ' + from.data.name + ' and ' + to.data.name + ' !'
        };

        const exampleData = {
            from: relationInstance.from,
            to: relationInstance.to,
            category: relation.id
        };

        for (let i = 0; i < relation.cardinalities.length; i++) {
            const cardinality = relation.cardinalities[i];
            if (cardinality.fromEntity.id === from.data.category || cardinality.toEntity.id === to.data.category) {
                returnValue = {
                    isFailed: false,
                    errorMsg: null
                };
            } else {
                if (cardinality.fromEntity.id === to.data.category || cardinality.toEntity.id === from.data.category) {
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
