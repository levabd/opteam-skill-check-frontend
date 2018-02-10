import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {LoggerService} from '../core/logger.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/shared/auth.service';
import {MessageService} from '../shared/components/messages/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private messenger: MessageService,
                private logger: LoggerService,
                private authService: AuthService) {
    }

    static isErrorWithStatus(err: HttpErrorResponse, status: number): boolean {
        return err instanceof HttpErrorResponse && err.status === status;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do( () => {
        }, err => {
            if (ErrorInterceptor.isErrorWithStatus(err, 401)) {
                this.logger.info('ErrorInterceptor@intercept: response  - "Unauthorized". so redirecting');
                this.messenger.add('You are unauthorised - you will be  redirected to login page');
                AuthService.clearAuthData();
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigate(['login']);
            }
            if (ErrorInterceptor.isErrorWithStatus(err, 400) && (err.error && err.error.error === 'Already authenticated.')) {
                this.logger.info('ErrorInterceptor@intercept: response  - "Already authorised". so redirecting');
                this.messenger.add('You are already authorised - you will be redirected to home page');
                this.authService.refreshUserInStorage();
            }
        });
    }
}
