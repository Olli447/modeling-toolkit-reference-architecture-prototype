import {AbstractEntity} from './abstractEntity';
import {SimpleCardinality} from './cardinality';
import {AbstractElement} from './abstractElement';
import {Variable} from './variable';

/**AbstractRelation is the interface every implemented relation has to inherit from.
 * It provides all necessary attributes that all relations have to implement
 *
 * Every Relation has an set of definitions of allowed connections between two entities */
export interface AbstractRelation extends AbstractElement {
    id: string;
    cardinalities: [CardinalityElement];

}

/**EntityInstance provides two variables: id and name.
 * The data of every element coming from GoJS needs to be copied (!!!) to an own data structure.
 * Errors will occur if you manipulate the data dirctly on the model
 *
 * Contrary to the normal use of relations (links) in GoJS the links in this application have id's (key's)
 * Every Relation comes from an entity and goes to an entity*/
export interface RelationInstance {
    from: string;
    to: string;
    key: string;
}

/**The CardinalityElement is used in the cardinalities array in {@link AbstractRelation}.
 *
 * It defines where a relation can be started an where it can end. Also the allowed numbers for the relation is managed here*/
export interface CardinalityElement {
    fromEntity: AbstractEntity;
    toEntity: AbstractEntity;
    cardinality: SimpleCardinality;
}

