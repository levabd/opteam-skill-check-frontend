import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import {catchError, tap} from 'rxjs/operators';

import {ApiRequest} from '../../core/api.request';
import {LoggerService} from '../../core/logger.service';
import {MessageService} from '../../shared/components/messages/message.service';
import {UserModel} from '../../layout/users/shared/users.model';
import {environment} from '../../../environments/environment';

const _apiUrl = `${environment.spa_api_domain}/api`;

@Injectable()
export class AuthService extends ApiRequest {

    tokenExpiresIn: string;
    isLoggedIn = false;
    apiUrl = _apiUrl;
    _user: UserModel;
    _token: string;

    static clearAuthData() {
        localStorage.removeItem('ot_auth_user');
        localStorage.removeItem('ot_auth_token');
        localStorage.removeItem('ot_auth_token_expires_at');
    }

    get user(): UserModel {
        if (this._user) {
            return this._user;
        }
        try {
            return JSON.parse(localStorage.getItem('ot_auth_user'));
        } catch (e) {
            this.logger.error({location: 'AuthService@user', error: e});
            console.error(e);
            this.logger.warn('AuthService@user: token is empty');
            return new UserModel;
        }
    }

    get token(): string {
        if (this._token) {
            return this._token;
        }
        try {
            return localStorage.getItem('ot_auth_token');
        } catch (e) {
            console.error(e);
            return '';
        }
    }

    // get expire_date(){
    //     if (this.tokenExpiresIn) {
    //         return this.tokenExpiresIn;
    //     }
    //     try {
    //         return localStorage.getItem('ot_auth_token_expires_at');
    //     } catch (e) {
    //         console.error(e);
    //         return '';
    //     }
    // }

    get redirectUrl() {
        if (!this.user && !localStorage.getItem('ot_auth_user')) {
            return 'login';
        }
        return 'dashboard';
    }

    // get expired(): boolean {
    //     if (!this.user && !localStorage.getItem('ot_auth_user')) {
    //         return true;
    //     }
    //     const date = new Date();
    //     const currentTime = date.getTime();
    //
    //     console.log('expired', currentTime,  parseInt(this.expire_date, 10),
    //         currentTime >=  parseInt(this.expire_date, 10));
    //     return currentTime >= parseInt(this.expire_date, 10);
    // }

    constructor(protected router: Router,
                protected http: HttpClient,
                protected messageService: MessageService,
                protected logger: LoggerService) {
        super(router, http, messageService, logger);

        if (this.token) {
            this.isLoggedIn = true;
        }
    }

    getToken(): string {
        return this._token;
    }

    saveToken(token: string): void {
        localStorage.setItem('ot_auth_token', token);
        this._token = token;
    }

    login(data: any): Observable<Object> {
        AuthService.clearAuthData();
        return this.http.post(`${this.apiUrl}/login`, data)
            .do<any>(res => this.registerSuccessResponse(res));
    }

    logout(): void {
        if (!this.user) {
            this.logger.info('AuthService@logout: user was not stored in localStorage');
            return;
        }
        this.http.post(`${this.apiUrl}/logout`, {id: this.user.id})
            .subscribe(() => {
                this.isLoggedIn = false;
                AuthService.clearAuthData();
                this.router.navigate(['login']);
            });
    }

    register(data: any): Observable<Object> {
        AuthService.clearAuthData();
        return this.http.post(`${this.apiUrl}/register`, data);
    }


    loginWithProvider(provider: string): Observable<any> {
        return this.http.post<string>(
            `${this.apiUrl}/oauth/${provider}`,
            {provider: provider});
    }

    registerSuccessResponse(data: any) {
        this.isLoggedIn = true;
        this._token = data.token;
        const expireAtDate = new Date();
        let expires_in = 0;
        try {
            expires_in = parseInt(data.expires_in, 10);
        } catch (e) {
            this.logger.warn('AuthService@registerSuccessResponse:' +
                `error while parsing expires_in(${data.expires_in}) from response`);
            expires_in = 3600; // Laravel default expires_in value
        }
        expireAtDate.setTime(expireAtDate.getTime() + expires_in);
        localStorage.setItem('ot_auth_token', data.token);
        localStorage.setItem('ot_auth_token_expires_at', JSON.stringify(expireAtDate.getTime()));
        this.refreshUserInStorage();
    }

    refreshUserInStorage(): void {
        this.isLoggedIn = true;
        this.http.get<UserModel>(`${this.apiUrl}/user`).pipe(
            tap(_ => this.log(`fetched User`)),
            catchError(this.handleError<UserModel>(`getUser error`))
        ).subscribe(user => {
            this.setUser(user);
            this.router.navigate([this.defineRedirectRoute(user.role.name)]);
        });
    }

    defineRedirectRoute(roleName?: string): string {
        switch (roleName) {
            case 'admin':
                return '/dashboard';
            case 'trainee':
                return '/dashboard';
            case 'trainer':
                return '/admin/dashboard';
            default:
                return '/dashboard';
        }
    }

    private setUser(user: UserModel | any) {
        this._user = user;
        localStorage.setItem('ot_auth_user', JSON.stringify(user));
    }
}
