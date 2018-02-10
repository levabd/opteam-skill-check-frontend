import {Component, OnInit, OnDestroy} from '@angular/core';
import {routerTransition} from '../../router.animations';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthBase} from '../shared/auth.base';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent extends AuthBase implements OnInit {
    loginForm: FormGroup;

    constructor(public router: Router,
                public authService: AuthService,
                public http: HttpClient,
                public fb: FormBuilder) {
        super(router, authService, http, fb)
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    ngOnInit() {
        if (this.authService.isLoggedIn && this.authService.user) {
            this.router.navigate([`/${this.authService.defineRedirectRoute(this.authService.user.role.name)}`])
            return;
        }

        super.ngOnInit();
    }

    onLogin() {
        if (this.loginForm.invalid) {
            this.email.markAsTouched();
            this.password.markAsTouched();
            return;
        }
        this.login(this.email.value, this.password.value);
    }
}
