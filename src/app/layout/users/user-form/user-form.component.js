"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var auth_base_1 = require("../../../auth/shared/auth.base");
require("rxjs/add/operator/do");
var role_model_1 = require("../../../shared/models/role.model");
var UserFormComponent = (function () {
    function UserFormComponent(route, router, userService, roleService, fb, location) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.roleService = roleService;
        this.fb = fb;
        this.location = location;
        this.formErrors = [];
        this.dataInvalid = false;
        this._user_id = 0;
        this.userLoaded = false;
    }
    UserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.roles = this.roleService.getRoles().do(function (data) { return data.push(new role_model_1.Role(0, 'Select role')); });
        this._user_id = parseInt(this.route.snapshot.paramMap.get('userId'), 10);
        this.userForm = this.fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(250)]],
            surname: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(250)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(auth_base_1.EMAIL_REGEX)]],
            role_id: [null, [forms_1.Validators.required]],
        });
        if (this.updating) {
            this.userService.getUserForUpdate(this._user_id).subscribe(function (user) {
                _this.userForm.addControl('_method', new forms_1.FormControl('PUT'));
                _this.userForm.addControl('id', new forms_1.FormControl(_this._user_id));
                _this.userForm.addControl('password', new forms_1.FormControl('', [forms_1.Validators.minLength(6)]));
                _this.name.setValue(user.name);
                _this.surname.setValue(user.surname);
                _this.email.setValue(user.email);
                _this.role_id.setValue(user.role_id);
                _this.userLoaded = true;
            });
        }
        else {
            this.userForm.addControl('passwords', this.fb.group({
                password: ['', forms_1.Validators.required],
                repeat: ['', forms_1.Validators.required]
            }, { validator: this.areEqual }));
            // this.userForm.addControl('password',
            //     new FormControl('', [Validators.required, Validators.minLength(6)])
            // );
            // this.userForm.addControl('password_confirmation',
            //     new FormControl('', [Validators.required, Validators.minLength(6), this.confirmedPasswordValidator(this)])
            // );
            // console.log(this.userForm.get('password_confirmation'));
        }
    };
    Object.defineProperty(UserFormComponent.prototype, "canDisplayForm", {
        get: function () {
            return !this._user_id || (this._user_id && this.userLoaded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "name", {
        get: function () {
            return this.userForm.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "surname", {
        get: function () {
            return this.userForm.get('surname');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "email", {
        get: function () {
            return this.userForm.get('email');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "password", {
        get: function () {
            return this.userForm.get('password');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "password_create", {
        get: function () {
            return this.userForm.passwords.get('password');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "password_confirmation_create", {
        get: function () {
            return this.updating ? null : this.userForm.passwords.get('password_confirmation');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "role_id", {
        get: function () {
            return this.userForm.get('role_id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "id", {
        get: function () {
            return this._user_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFormComponent.prototype, "updating", {
        get: function () {
            return this.isNumeric(this._user_id) && this._user_id !== 0;
        },
        enumerable: true,
        configurable: true
    });
    UserFormComponent.prototype.onSave = function () {
        if (this.updating) {
            this.onUpdate();
        }
        else {
            this.onCreate();
        }
    };
    UserFormComponent.prototype.onUpdate = function () {
        var _this = this;
        if (!this.isValid())
            return;
        this.userService.updateUser(this.userForm.value).subscribe(function () { return _this.router.navigate(['/users']); }, function (err) { return _this.handleFormError(err); });
    };
    UserFormComponent.prototype.onCreate = function () {
        var _this = this;
        if (!this.isValid())
            return;
        this.userService.addUser(this.userForm.value).subscribe(function () { return _this.router.navigate(['/users']); }, function (err) { return _this.handleFormError(err); });
    };
    UserFormComponent.prototype.isValid = function () {
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
    };
    UserFormComponent.prototype.handleFormError = function (err) {
        this.dataInvalid = true;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            this.formErrors.push(err.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            if (err.status === 0) {
                this.formErrors.push('please check your backend server.');
            }
            else {
                if (err.status === 422) {
                    this.formErrors = this.userService.setFormErrors(err.error.errors);
                    console.log(this.formErrors);
                }
            }
        }
    };
    UserFormComponent.prototype.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    UserFormComponent.prototype.areEqual = function (group) {
        var valid = false;
        var first;
        for (var name_1 in group.controls) {
            if (first && first === group.controls[name_1].value) {
                valid = true;
                break;
            }
            else {
                first = group.controls[name_1].value;
            }
        }
        if (valid) {
            return null;
        }
        return {
            areEqual: true
        };
    };
    UserFormComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './user-form.component.html',
            styleUrls: ['./user-form.component.scss'],
        })
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;
