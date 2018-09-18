import {Entity} from '../../core/classes/entity';
import {Variable} from '../../core/classes/variable';

export class Constraint implements Entity {
    id: string;
    name: string;
    category: string;
    variables: Variable[];

    imagePath: string;
    template: object;

}
