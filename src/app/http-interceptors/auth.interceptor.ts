import {Injectable, Injector} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {AuthService} from '../auth/shared/auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authService.token}`
            }
        });
        return next.handle(request);
    }
}
