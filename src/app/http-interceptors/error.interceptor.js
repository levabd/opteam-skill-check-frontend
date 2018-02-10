"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/do");
var auth_service_1 = require("../auth/shared/auth.service");
var ErrorInterceptor = (function () {
    function ErrorInterceptor(router, messenger, logger, authService) {
        this.router = router;
        this.messenger = messenger;
        this.logger = logger;
        this.authService = authService;
    }
    ErrorInterceptor_1 = ErrorInterceptor;
    ErrorInterceptor.isErrorWithStatus = function (err, status) {
        return err instanceof http_1.HttpErrorResponse && err.status === status;
    };
    ErrorInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).do(function () {
        }, function (err) {
            if (ErrorInterceptor_1.isErrorWithStatus(err, 401)) {
                _this.logger.info('ErrorInterceptor@intercept: response  - "Unauthorized". so redirecting');
                _this.messenger.add('You are unauthorised - you will be  redirected to login page');
                auth_service_1.AuthService.clearAuthData();
                // noinspection JSIgnoredPromiseFromCall
                _this.router.navigate(['login']);
            }
            if (ErrorInterceptor_1.isErrorWithStatus(err, 400) && (err.error && err.error.error === 'Already authenticated.')) {
                _this.logger.info('ErrorInterceptor@intercept: response  - "Already authorised". so redirecting');
                _this.messenger.add('You are already authorised - you will be redirected to home page');
                _this.authService.refreshUserInStorage();
            }
        });
    };
    ErrorInterceptor = ErrorInterceptor_1 = __decorate([
        core_1.Injectable()
    ], ErrorInterceptor);
    return ErrorInterceptor;
    var ErrorInterceptor_1;
}());
exports.ErrorInterceptor = ErrorInterceptor;
