import {AbstractCheckHandler, CheckReturn} from '../../classes/abstractCheckHandler';
import {Relation} from '../../classes/relation';
import * as go from 'gojs';

export class QuantityCheckHandler extends AbstractCheckHandler {
    check(diagram: go.Diagram, relation: Relation, relationInstance: any): CheckReturn {
        const from: go.Node = diagram.findNodeForKey(relationInstance.from);
        const to: go.Node = diagram.findNodeForKey(relationInstance.to);

        let returnValue: CheckReturn = {
            isFailed: false,
            errorMsg: null
        };

        const exampleData = {
            from: relationInstance.from,
            to: relationInstance.to,
            category: relation.id
        };
        const exampleDataReversed = {
            from: relationInstance.to,
            to: relationInstance.from,
            category: relation.id
        };

        const existingLinks = diagram.findLinksByExample(exampleData);
        const existingLinksReversed = diagram.findLinksByExample(exampleDataReversed);
        const size = existingLinks.count + existingLinksReversed.count;

        for (let i = 0; i < relation.cardinalities.length; i++) {
            const cardinality = relation.cardinalities[i];
            if (cardinality.fromEntity.id === from.data.category || cardinality.toEntity.id === to.data.category) {
                const maxCount =  (cardinality.cardinality.to.max === 'n' || cardinality.cardinality.to.max === 'm') ?
                    Number.MAX_SAFE_INTEGER : Number.parseInt(cardinality.cardinality.to.max, null);

                if (size >= maxCount) {
                    returnValue = {
                        isFailed: true,
                        errorMsg: 'The number of relations is restricted to ' + maxCount + '!'
                    };
                }

            }
        }
        return returnValue;
    }

}
