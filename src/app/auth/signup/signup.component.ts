import {Component, OnInit, OnDestroy} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup, Validators} from '@angular/forms';
import {AuthBase} from '../shared/auth.base';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignUpComponent extends AuthBase implements OnInit, OnDestroy {

    registerForm: FormGroup;
    dataInvalid = false;
    formSubmitting = false;

    ngOnInit() {
        super.ngOnInit();
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(250)]],
            surname: ['', [Validators.required, Validators.maxLength(250)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get name() {
        return this.registerForm.get('name');
    }

    get surname() {
        return this.registerForm.get('surname');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get password_confirmation() {
        return this.registerForm.get('password_confirmation');
    }

    onRegister(): void {
        this.formErrors = [];
        this.formSubmitting = true;

        if (this.registerForm.invalid) {
            this.name.markAsTouched();
            this.surname.markAsTouched();
            this.email.markAsTouched();
            this.password.markAsTouched();
            this.password_confirmation.markAsTouched();
            return;
        }

        this.authService.register(this.registerForm.value).subscribe(
            (response: { email?: string, password?: string }) => {
                this.formSubmitting = false;
                // if (this.authService.isLoggedIn) {
                //     // Get the redirect URL from our auth service
                //     // If no redirect has been set, use the default
                //     const redirect = this.authService.redirectUrl || '/';
                //     // Redirect the user
                //     this.router.navigate([redirect]);
                // }
                try {
                    this.authService.registerSuccessResponse(response);
                } catch (e) {
                    console.error('SignUpComponent@onRegister: error while login after registration', e);
                }
            }, (err: HttpErrorResponse) => {
                this.dataInvalid = true;
                this.formSubmitting = false;
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
                            this.setFormErrors(err.error.errors);
                        }
                    }
                }
            });
    }
}
