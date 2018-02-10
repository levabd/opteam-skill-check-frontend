"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var logger_service_1 = require("./logger.service");
var http_1 = require("@angular/common/http");
var request_interceptor_1 = require("./request.interceptor");
var auth_service_1 = require("./auth.service");
var logger_console_service_1 = require("./logger.console.service");
var message_service_1 = require("../shared/modules/messages/message.service");
var users_service_1 = require("../layout/users/users.service");
var CoreModule = (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            providers: [,
                users_service_1.UsersService,
                message_service_1.MessageService,
                auth_service_1.AuthService,
                {
                    provide: logger_service_1.LoggerService,
                    useClass: logger_console_service_1.LoggerConsoleService
                },
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: request_interceptor_1.RequestInterceptor,
                    multi: true
                }]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
