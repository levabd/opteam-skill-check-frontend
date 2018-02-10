
import {Model} from '../../../shared/models/model';

export class UserModel implements Model {
    id?: number;
    name: string;
    surname?: string;
    email: string;
    role?: any;
    role_id?: number;
}
