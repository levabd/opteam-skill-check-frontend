import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoggerService} from './logger.service';
import {LaravelPaginationModel, PaginationModel} from '../shared/models/pagination.model';
import {MessageService} from '../shared/components/messages/message.service';
import {ErrorInterceptor} from '../http-interceptors/error.interceptor';
import {AuthService} from '../auth/shared/auth.service';

export class ApiRequest {

    constructor(protected router: Router,
                protected http: HttpClient,
                protected messageService: MessageService,
                protected logger: LoggerService) {
    }

    static isErrorWithStatus(err: HttpErrorResponse, status: number): boolean {
        return err instanceof HttpErrorResponse && err.status === status;
    }

    public toHttpParams(params) {
        return Object.getOwnPropertyNames(params)
            .reduce((p, key) => p.set(key, params[key]), new HttpParams());
    }

    /** Log a UserService message with the MessageService */
    public log(message: string) {
       this.messageService.add('UserService: ' + message);
       this.logger.info('ApiRequest@log: ' + message);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            // console.log(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.

            if (ApiRequest.isErrorWithStatus(error, 401)) {
                this.log(`${operation} failed: ${error.message}`);
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigate(['login']);
            }
            if (ApiRequest.isErrorWithStatus(error, 400) && (error.error && error.error.error === 'Already authenticated.')) {
                this.log('You are already authorised - you will be redirected to home page');
            }

            return Observable.throw('Error while ApiRequest');
        };
    }

    /**
     * Convert Laraval's snake_case pagination to lowerCamelCase
     * @param {LaravelPaginationModel} response - response from Laravel API
     * @returns {PaginationModel}
     */
    public mapPagination(response: LaravelPaginationModel): PaginationModel {
        return new PaginationModel(
            response.data,
            response.total,
            response.per_page,
            response.current_page,
            response.last_page,
            response.first_page_url,
            response.last_page_url,
            response.next_page_url,
            response.prev_page_url,
            response.path,
            response.from,
            response.to);
    }

    setFormErrors(errors = {}): string[] {
        const formErrors = [];
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                formErrors.push(errors[key]);
            }
        }

        return formErrors;
    }
}