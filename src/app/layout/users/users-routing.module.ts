import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            { path: '', redirectTo: 'list' },
            { path: 'list', component: UserListComponent },
            { path: 'create', component: UserFormComponent },
            { path: ':userId/edit', component: UserFormComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
