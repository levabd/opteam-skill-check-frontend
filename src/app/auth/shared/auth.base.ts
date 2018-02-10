import {NgModule, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import {WindowOptions} from './window.options';
import {AuthService} from './auth.service';
import {FormErrorHandler} from './forms.handler';


@NgModule({
    imports: [HttpClientModule],
    providers: [AuthService, HttpClient, FormBuilder]
})
export class AuthBase implements OnDestroy, OnInit, FormErrorHandler {
    protected facebookAvailable: string;
    protected linkedInAvailable: string;
    formErrors = [];

    constructor(public router: Router,
                public authService: AuthService,
                public http: HttpClient,
                public fb: FormBuilder) {
    }

    static unRegisterAllEventListeners(obj) {
        if (typeof obj._eventListeners === 'undefined' || obj._eventListeners.length === 0) {
            return;
        }

        for (let i = 0, len = obj._eventListeners.length; i < len; i++) {
            const e = obj._eventListeners[i];
            obj.removeEventListener(e.event, e.callback);
        }

        obj._eventListeners = [];
    }
    static defineRedirectRoute(roleName: string): string {
        switch (roleName) {
            case 'admin':
                return 'admin/dashboard';
            case 'trainee':
                return 'dashboard';
            case 'trainer':
                return 'admin/dashboard';
            default:
                return 'dashboard';
        }
    }
    ngOnInit() {
        this.facebookAvailable = environment.facebookAuth;
        this.linkedInAvailable = environment.linkedinAuth;

        const vm = this;
        const onMessage = function (e) {
            if (environment.spa_api_domain !== e.origin || !e.data.token || !e.data.expires_in) {
                return;
            }

            vm.authService.registerSuccessResponse(e.data);
        };

        window.addEventListener('message', onMessage);
    }

    ngOnDestroy() {
        AuthBase.unRegisterAllEventListeners(window);
    }

    login(email:string, password:string) {
        this.authService.login({email: email, password: password })
            .subscribe(() => {}, res => (res.status === 422) && (this.setFormErrors(res.error.errors)));
    }

    onSocial(provider: string) {
        this.authService.loginWithProvider(provider)
            .subscribe(
                r => this.openWindow(r.url, 'Text', new WindowOptions()),
                response => {
                    if (response.status === 400 && response.error.error === 'Already authenticated.') {
                        // noinspection JSIgnoredPromiseFromCall
                        this.router.navigate([this.authService.redirectUrl]);
                    }
                });
    }

    openWindow(url: string, title: string, windowOptions: WindowOptions) {

        if (typeof url === 'object') {
            windowOptions = url;
            url = '';
        }
        windowOptions = {url, title, width: 600, height: 720, ...windowOptions};

        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : 200;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : 200;
        const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
        const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height;

        windowOptions.left = ((width / 2) - (windowOptions.width / 2)) + dualScreenLeft;
        windowOptions.top = ((height / 2) - (windowOptions.height / 2)) + dualScreenTop;

        const optionsStr = Object.keys(windowOptions).reduce((acc, key) => {
            acc.push(`${key}=${windowOptions[key]}`);
            return acc;
        }, []).join(',');

        const newWindow = window.open(url, title, optionsStr);

        if (window.focus) {
            newWindow.focus();
        }

        return newWindow;
    }

    setFormErrors(errors = {}): void {
        this.formErrors = [];
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                this.formErrors.push(errors[key]);
            }
        }
    }
}
