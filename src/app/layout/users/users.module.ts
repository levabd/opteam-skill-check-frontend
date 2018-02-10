import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {PageHeaderModule} from './../../shared';
import {UserListComponent} from './user-list/user-list.component';
import {UserService} from './shared/users.service';
import { UserFormComponent } from './user-form/user-form.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {DynamicFormQuestionComponent} from '../../core/dynamic-forms/dynamic-form-question/dynamic-form-question.component';
import {DynamicFormComponent} from '../../core/dynamic-forms/dynamic-form/dynamic-form.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        UsersRoutingModule,
        ReactiveFormsModule,
        TranslateModule,
        PageHeaderModule,
        NgbModule.forRoot(),
        SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn'
        })
    ],
    declarations: [
        UsersComponent,
        UserListComponent,
        UserFormComponent,
        DynamicFormComponent,
        DynamicFormQuestionComponent
    ],
    providers: [UserService],
})
export class UserModule {
    constructor(private translate: TranslateService){}
}
