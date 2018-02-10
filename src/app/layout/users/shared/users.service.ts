import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';

import {UserModel} from './users.model';
import {ApiRequest} from '../../../core/api.request';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {PaginationModel} from '../../../shared/models/pagination.model';
import {UserListFilter} from '../user-list/user-list.filter';
import {LoggerService} from '../../../core/logger.service';
import {MessageService} from '../../../shared/components/messages/message.service';
import {AuthService} from '../../../auth/shared/auth.service';

@Injectable()
export class UserService extends ApiRequest {

    private apiUrl: string;

    constructor(protected  router: Router,
                protected http: HttpClient,
                protected messageService: MessageService,
                protected logger: LoggerService) {
        super(router, http, messageService, logger);
        this.apiUrl = `${environment.spa_api_domain}/api/admin/users`;
    }

    /**
     * Get list of users
     * @param {UserListFilter} filter
     * @returns {Observable<PaginationModel>}
     */
    getUsers(filter: UserListFilter): Observable<PaginationModel> {
        // Todo: send the message _after_ fetching the Useres
        // this.messageService.add('UserService: fetched Useres');
        return this.http.get<PaginationModel | any>(
            this.apiUrl, {params: this.toHttpParams(filter)}
        ).pipe(
            tap(users => this.log(`fetched users`)),
            catchError(this.handleError('getUsers', [])));
    }
    /** GET User by id. Will 404 if id not found */
    getUserForUpdate(id: number): Observable<UserModel> {
        const url = `${this.apiUrl}/${id}/edit`;
        return this.http.get<UserModel>(url).pipe(
            tap(_ => this.log(`fetched User id=${id}`)),
            catchError(this.handleError<UserModel>(`getUser id=${id}`))
        );
    }

    /** PUT: update the User on the server */
    updateUser(user: UserModel): Observable<any> {
        return this.http.post(`${this.apiUrl}/${user.id}`, user).pipe(
            tap(_ => this.log(`updated User id=${user.id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

    /** POST: add a new User to the server */
    addUser(user: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(this.apiUrl, user).pipe(
            tap((user: UserModel) => this.log(`added user w/ id=${user.id}`)),
            catchError(this.handleError<UserModel>('addUser'))
        );
    }

    /** DELETE: delete the user from the server */
    deleteUser(user: UserModel | number): Observable<UserModel> {
        const id = typeof user === 'number' ? user : user.id;
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<UserModel>(url).pipe(
            tap(_ => this.log(`deleted user id=${id}`)),
            catchError(this.handleError<UserModel>('deleteUser'))
        );
    }
}
