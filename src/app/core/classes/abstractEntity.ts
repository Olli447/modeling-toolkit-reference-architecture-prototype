import {AbstractElement} from './abstractElement';
import {Variable} from './variable';

/**AbstractEntity is the interface every implemented entity has to inherit from.
 * It provides all necessary attributes that all entities have to implement*/
export interface AbstractEntity extends AbstractElement {
    id: string;
}

/**EntityInstance provides two variables: id and name.
 * The data of every element coming from GoJS needs to be copied (!!!) to an own data structure.
 * Errors will occur if you manipulate the data dirctly on the model
 *
 * Every element has an unique Id an name*/
export interface EntityInstance {
    id: string;
    name: string;
}
