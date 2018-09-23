import * as go from 'gojs';

/** AbstractElement is the interface every entity and relation inherits via AbstractEntity and AbstractRelation
 *  Every elements needs a name and an image to be able to be presented in the elements sidebar.
 *  Also a template in GoJS annotation is needed so that the element can be created in the diagram
 *  */
export interface AbstractElement {
    name: string;
    /**
     * This is the image path relative to the current location of the file
     * */
    imagePath: string;
    /**
     * This is the template of the entity/relation. It is created with the GoJS Syntax.
     * */
    template: object;
}
