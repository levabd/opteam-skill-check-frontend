-page - header[heading];
"user_id ? 'Update user' : 'Create user' | translate"[icon] = "'fa-users'" > /app-page-header>
    < div;
var default_1 = (function () {
    function default_1() {
    }
    return default_1;
}());
"row" >
    (function () {
        function class_1() {
        }
        return class_1;
    }());
"col-lg-6 col-12" >
;
"userForm"(ngSubmit) = "onSave()";
var default_2 = (function () {
    function default_2() {
    }
    return default_2;
}());
"form-signin";
novalidate >
    (function () {
        function class_2() {
        }
        return class_2;
    }());
"div" * ngIf;
"!canDisplayForm" > Wait;
for (data < /small></div >
    (function () {
        function class_3() {
        }
        return class_3;
    }());  = "form-content" * ngIf;  = "canDisplayForm" >
    (function () {
        function class_4() {
        }
        return class_4;
    }()))
     = "alert-list" * ngIf;
"formErrors.length" >
    (function () {
        function class_5() {
        }
        return class_5;
    }());
"alert alert-warning" * ngFor;
"let error of formErrors" >
    {};
{
    error[0];
}
/div>
    < /div>
    < div;
var default_3 = (function () {
    function default_3() {
    }
    return default_3;
}());
"form-group" >
     * ngIf;
"updating" >
    type;
"hidden";
formControlName = "id" >
    /div>
    < input;
type = "text";
formControlName = "name";
var default_4 = (function () {
    function default_4() {
    }
    return default_4;
}());
"form-control input-underline input-lg"[(function () {
    function class_6() {
    }
    return class_6;
}()).is - invalid] = "name.invalid && (name.dirty || name.touched)";
id = "first-name";
placeholder = "{{'Name'| translate}}";
required >
     * ngIf;
"name.errors && name.errors.required";
var default_5 = (function () {
    function default_5() {
    }
    return default_5;
}());
"invalid-feedback" >
    Field;
is;
required.
    < /div>
    < div * ngIf;
"name.errors && name.errors.maxlength";
var default_6 = (function () {
    function default_6() {
    }
    return default_6;
}());
"invalid-feedback" >
    You;
must;
enter;
maximum;
250;
symbols
    < /div>
    < /div>
    < div;
var default_7 = (function () {
    function default_7() {
    }
    return default_7;
}());
"form-group" >
    type;
"text";
formControlName = "surname";
var default_8 = (function () {
    function default_8() {
    }
    return default_8;
}());
"form-control input-underline input-lg"[(function () {
    function class_7() {
    }
    return class_7;
}()).is - invalid] = "surname.invalid && (surname.dirty || surname.touched)";
id = "surname";
placeholder = "{{'Surname'| translate}}" >
     * ngIf;
"surname.errors && surname.errors.required";
var default_9 = (function () {
    function default_9() {
    }
    return default_9;
}());
"invalid-feedback" >
    Field;
is;
required.
    < /div>
    < div * ngIf;
"surname.errors && surname.hasError('maxlength')";
var default_10 = (function () {
    function default_10() {
    }
    return default_10;
}());
"invalid-feedback" >
    You;
must;
enter;
maximum;
250;
symbols
    < /div>
    < /div>
    < div;
var default_11 = (function () {
    function default_11() {
    }
    return default_11;
}());
"form-group" >
    type;
"text";
formControlName = "email"[(function () {
    function class_8() {
    }
    return class_8;
}()).is - invalid] = "email.invalid && (email.dirty || email.touched)";
var default_12 = (function () {
    function default_12() {
    }
    return default_12;
}());
"form-control input-underline input-lg";
id = "email";
placeholder = "{{'Email'| translate}}" >
     * ngIf;
"email.errors && email.errors.required";
var default_13 = (function () {
    function default_13() {
    }
    return default_13;
}());
"invalid-feedback" >
    Field;
is;
required.
    < /div>
    < div * ngIf;
"email.hasError('pattern')";
var default_14 = (function () {
    function default_14() {
    }
    return default_14;
}());
"invalid-feedback" >
    Email;
does;
not;
match;
pattern: domain;
/div>
    < /div>
    < div;
var default_15 = (function () {
    function default_15() {
    }
    return default_15;
}());
"form-group" * ngIf;
"updating" >
    type;
"password";
formControlName = "password"[(function () {
    function class_9() {
    }
    return class_9;
}()).is - invalid] = "password.invalid && (password.dirty || password.touched)";
var default_16 = (function () {
    function default_16() {
    }
    return default_16;
}());
"form-control input-underline input-lg";
id = "_password";
placeholder = "{{'Password'| translate}}";
autocomplete = "off" >
     * ngIf;
"password.invalid && password.errors && password.errors.required";
var default_17 = (function () {
    function default_17() {
    }
    return default_17;
}());
"invalid-feedback" >
    Field;
is;
required.
    < /div>
    < div * ngIf;
"password.invalid && password.errors && password.errors.minlength";
var default_18 = (function () {
    function default_18() {
    }
    return default_18;
}());
"invalid-feedback" >
    You;
must;
enter;
min;
6;
symbols
    < /div>
    < /div>
    < div;
var default_19 = (function () {
    function default_19() {
    }
    return default_19;
}());
"form-group" * ngIf;
"!updating" >
    type;
"password";
formControlName = "userForm.passwords.password"[(function () {
    function class_10() {
    }
    return class_10;
}()).is - invalid] = "password_create.invalid && (password_create.dirty || password_create.touched)";
var default_20 = (function () {
    function default_20() {
    }
    return default_20;
}());
"form-control input-underline input-lg";
placeholder = "{{'Password'| translate}}";
autocomplete = "off" >
     * ngIf;
"password_create.invalid && password_create.errors && password_create.errors.required";
var default_21 = (function () {
    function default_21() {
    }
    return default_21;
}());
"invalid-feedback" >
    Field;
is;
required.
    < /div>
    < div * ngIf;
"password_create.invalid && password_create.errors && password_create.errors.minlength";
var default_22 = (function () {
    function default_22() {
    }
    return default_22;
}());
"invalid-feedback" >
    You;
must;
enter;
min;
6;
symbols
    < /div>
    < /div>
    < div;
var default_23 = (function () {
    function default_23() {
    }
    return default_23;
}());
"form-group" * ngIf;
"!updating" >
    type;
"password";
formControlName = "password_confirmation_create"[(function () {
    function class_11() {
    }
    return class_11;
}()).is - invalid] = "password_confirmation_create.invalid && (password_confirmation_create.dirty || password_confirmation_create.touched)";
var default_24 = (function () {
    function default_24() {
    }
    return default_24;
}());
"form-control input-underline input-lg";
id = "_password_confirmation";
placeholder = "{{'Repeat password'| translate}}";
autocomplete = "off" >
     * ngIf;
"password_confirmation_create.invalid && password_confirmation_create.errors?.required";
var default_25 = (function () {
    function default_25() {
    }
    return default_25;
}());
"invalid-feedback" >
    Field;
is;
required.
    < /div>
    < div * ngIf;
"password_confirmation_create.invalid && password_confirmation_create.errors?.minlength";
var default_26 = (function () {
    function default_26() {
    }
    return default_26;
}());
"invalid-feedback" >
    You;
must;
enter;
min;
6;
symbols
    < /div>
    < div * ngIf;
"password_confirmation_create.invalid && password_confirmation_create.errors?.confirmedPassword";
var default_27 = (function () {
    function default_27() {
    }
    return default_27;
}());
"invalid-feedback" >
    Please;
provide;
valid;
password;
confirmation
    < /div>
    < /div>
    < div;
var default_28 = (function () {
    function default_28() {
    }
    return default_28;
}());
"form-group" >
    formControlName;
"role_id"[(function () {
    function class_12() {
    }
    return class_12;
}()).is - invalid] = "role_id.invalid && (role_id.dirty || role_id.touched)";
var default_29 = (function () {
    function default_29() {
    }
    return default_29;
}());
"form-control" >
     * ngFor;
"let role of roles | async"[value] = "role.id"[selected] = "!updating && role.id===0" > {};
{
    role.name | translate;
}
/option>
    < /select>
    < div * ngIf;
"role_id.invalid && role_id.errors?.required";
var default_30 = (function () {
    function default_30() {
    }
    return default_30;
}());
"invalid-feedback" >
    Field;
is;
required.
    < /div>
    < /div>
    < /div>
    < div;
var default_31 = (function () {
    function default_31() {
    }
    return default_31;
}());
"d-flex justify-content-start" * ngIf;
"canDisplayForm" >
     * ngIf;
"updating";
var default_32 = (function () {
    function default_32() {
    }
    return default_32;
}());
"btn btn-light"(click) = "onUpdate(userForm)" > {};
{
    'Update' | translate;
}
/a>&nbsp;
    < a * ngIf;
"!updating";
var default_33 = (function () {
    function default_33() {
    }
    return default_33;
}());
"btn btn-light"(click) = "onCreate(userForm)" > {};
{
    'Create' | translate;
}
/a>&nbsp;
    < a;
var default_34 = (function () {
    function default_34() {
    }
    return default_34;
}());
"btn btn-light"(click) = "location.back()" > {};
{
    'To list' | translate;
}
/a>
    < /div>
    < /form>
    < /div>
    < /div>;
