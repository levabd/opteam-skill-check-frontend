import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ApiRequest} from '../../core/api.request';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/logger.service';
import {Role} from '../models/role.model';
import {MessageService} from '../components/messages/message.service';
import {AuthService} from '../../auth/shared/auth.service';

@Injectable()
export class RoleService extends ApiRequest {

    private apiUrl: string;

    constructor(
                protected  router: Router,
                protected http: HttpClient,
                protected messageService: MessageService,
                protected logger: LoggerService) {
        super(router, http, messageService, logger);
        this.apiUrl = `${environment.spa_api_domain}/api/admin/roles`;
    }

    /**
     * @returns {Observable<PaginationModel>}
     */
    getRoles(): Observable<Role|any> {
        // Todo: send the message _after_ fetching the Useres
        // this.messageService.add('UserService: fetched Useres');
        return this.http.get<Role[]>(this.apiUrl);
    }
}
