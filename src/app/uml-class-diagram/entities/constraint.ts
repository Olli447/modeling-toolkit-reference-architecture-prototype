import {Entity} from '../../classes/entity';
import {Variable} from '../../classes/variable';

export class Constraint implements Entity {
    id: string;
    name: string;
    category: string;
    variables: Variable[];

    imagePath: string;
    template: object;

}
