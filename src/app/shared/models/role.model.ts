import {Model} from './model';

export class Role implements Model {
    constructor(public id: number, public name: string) {
    }
}