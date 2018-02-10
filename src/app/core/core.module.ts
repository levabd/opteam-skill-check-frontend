import {NgModule} from '@angular/core';
import {LoggerService} from './logger.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from '../auth/shared/auth.service';
import {LoggerConsoleService} from './logger.console.service';

import {UserService} from '../layout/users/shared/users.service';
import {LoggingInterceptor} from '../http-interceptors/logging.interceptor';
import {RequestInterceptor} from '../http-interceptors/auth.interceptor'
import {ErrorInterceptor} from '../http-interceptors/error.interceptor';
import {RoleService} from '../shared/services/role.service';
import {MessageService} from '../shared/components/messages/message.service';

@NgModule({
    providers: [
        UserService,
        RoleService,
        MessageService,
        AuthService,
        {
            provide: LoggerService,
            useClass: LoggerConsoleService
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoggingInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
}
