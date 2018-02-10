import {Component, OnInit, OnDestroy} from '@angular/core';

import {HttpErrorResponse} from '@angular/common/http';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import 'rxjs/add/operator/do';

import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/users.service';
import {RoleService} from '../../../shared/services/role.service';
import {Role} from '../../../shared/models/role.model';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {matchValidator} from '../../../shared/validatoin/password.equal.validator';
import {EMAIL_VALIDATOR} from '@angular/forms/src/directives/validators';

@Component({
    selector: 'app-signup',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    formErrors = [];
    userForm: FormGroup;
    dataInvalid = false;
    _user_id  = 0;
    userLoaded = false;

    roles: Observable<Role | any>;

    constructor(private route: ActivatedRoute,
                public router: Router,
                private userService: UserService,
                private roleService: RoleService,
                public fb: FormBuilder,
                public location: Location) {

    }

    ngOnInit() {
        this.roles = this.roleService.getRoles().do(data => data.push(new Role(0, 'Select role')));

        this._user_id = parseInt(this.route.snapshot.paramMap.get('userId'), 10);
        this.userForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(250)]],
            surname: ['', [Validators.required, Validators.maxLength(250)]],
            email: ['', [Validators.required, Validators.email]],
            role_id: [null, [Validators.required]],
        });

        if (this.updating) {
            this.userService.getUserForUpdate(this._user_id).subscribe(user => {
                this.userForm.addControl('_method', new FormControl('PUT'));
                this.userForm.addControl('id', new FormControl(this._user_id));
                this.userForm.addControl('password', new FormControl('', [Validators.minLength(6)]));
                this.name.setValue(user.name);
                this.surname.setValue(user.surname);
                this.email.setValue(user.email);
                this.role_id.setValue(user.role_id);
                this.userLoaded = true;
            });
        } else {
            this.userForm.addControl('password',
                new FormControl('', [Validators.required, Validators.minLength(6)])
            );
            this.userForm.addControl('password_confirmation',
                new FormControl('', [
                    Validators.required, Validators.minLength(6),
                    matchValidator('password')
                ])
            );
            console.log(this.userForm.get('password_confirmation'));
        }
    }

    get canDisplayForm() {
        return !this._user_id || (this._user_id && this.userLoaded);
    }

    get name() {
        return this.userForm.get('name');
    }

    get surname() {
        return this.userForm.get('surname');
    }

    get email() {
        return this.userForm.get('email');
    }

    get password() {
        return this.userForm.get('password');
    }

    get password_confirmation() {
        return this.updating ? null : this.userForm.get('password_confirmation');
    }

    get role_id() {
        return this.userForm.get('role_id');
    }

    get id() {
        return this._user_id;
    }

    get updating(): boolean {
        return this.isNumeric(this._user_id) && this._user_id !== 0;
    }

    onSave(): void {
        if (this.updating) {
            this.onUpdate();
        } else {
            this.onCreate();
        }
    }

    onUpdate() {
        if (!this.isValid()) { return; }
        this.userService.updateUser(this.userForm.value).subscribe(() => this.router.navigate(['/users']),
            (err: HttpErrorResponse) => this.handleFormError(err));
    }

    onCreate() {
        if (!this.isValid()) { return; }
        this.userService.addUser(this.userForm.value).subscribe(() => this.router.navigate(['/users']),
            (err: HttpErrorResponse) => this.handleFormError(err));
    }

    isValid(): boolean {
        this.formErrors = [];

        if (this.userForm.invalid) {
            this.name.markAsTouched();
            this.surname.markAsTouched();
            this.email.markAsTouched();
            this.password.markAsTouched();
            this.role_id.markAsTouched();

            return false;
        }
        return true;
    }

    handleFormError(err: HttpErrorResponse) {
        this.dataInvalid = true;

        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            this.formErrors.push(err.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            if (err.status === 0) {
                this.formErrors.push('please check your backend server.');
            } else {
                if (err.status === 422) {
                    this.formErrors = this.userService.setFormErrors(err.error.errors);
                    console.log(this.formErrors);
                }
            }
        }
    }

    isNumeric(n): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
