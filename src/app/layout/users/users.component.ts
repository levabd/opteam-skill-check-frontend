import {Component, OnInit} from '@angular/core';
import {UserModel} from './shared/users.model';
import {UserService} from './shared/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],

})
export class UsersComponent implements OnInit {
    selectedHero: UserModel;
    users: UserModel[];
    public title = 'User list';

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        // this.getHeroes();
    }

    onSelect(user: UserModel): void {
        this.selectedHero = user;
    }

    // getHeroes(): void {
    //     this.userService.getUsers()
    //         .subscribe(users => this.users = users);
    // }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.userService.addUser({name} as UserModel)
            .subscribe(hero => {
                this.users.push(hero);
            });
    }

    delete(user: UserModel): void {
        this.users = this.users.filter(h => h !== user);
        this.userService.deleteUser(user).subscribe();
    }
}
