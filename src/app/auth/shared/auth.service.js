"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/do");
var operators_1 = require("rxjs/operators");
var api_request_1 = require("../../core/api.request");
var users_model_1 = require("../../layout/users/shared/users.model");
var environment_1 = require("../../../environments/environment");
var _apiUrl = environment_1.environment.spa_api_domain + "/api";
var AuthService = (function (_super) {
    __extends(AuthService, _super);
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
    function AuthService(router, http, messageService, logger) {
        var _this = _super.call(this, router, http, messageService, logger) || this;
        _this.router = router;
        _this.http = http;
        _this.messageService = messageService;
        _this.logger = logger;
        _this.isLoggedIn = false;
        _this.apiUrl = _apiUrl;
        if (_this.token) {
            _this.isLoggedIn = true;
        }
        return _this;
    }
    AuthService_1 = AuthService;
    AuthService.clearAuthData = function () {
        localStorage.removeItem('ot_auth_user');
        localStorage.removeItem('ot_auth_token');
        localStorage.removeItem('ot_auth_token_expires_at');
    };
    Object.defineProperty(AuthService.prototype, "user", {
        get: function () {
            if (this._user) {
                return this._user;
            }
            try {
                return JSON.parse(localStorage.getItem('ot_auth_user'));
            }
            catch (e) {
                this.logger.error({ location: 'AuthService@user', error: e });
                console.error(e);
                this.logger.warn('AuthService@user: token is empty');
                return new users_model_1.UserModel;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "token", {
        get: function () {
            if (this._token) {
                return this._token;
            }
            try {
                return localStorage.getItem('ot_auth_token');
            }
            catch (e) {
                console.error(e);
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "redirectUrl", {
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
        get: function () {
            if (!this.user && !localStorage.getItem('ot_auth_user')) {
                return 'login';
            }
            return 'dashboard';
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.getToken = function () {
        return this._token;
    };
    AuthService.prototype.saveToken = function (token) {
        localStorage.setItem('ot_auth_token', token);
        this._token = token;
    };
    AuthService.prototype.login = function (data) {
        var _this = this;
        AuthService_1.clearAuthData();
        return this.http.post(this.apiUrl + "/login", data)
            .do(function (res) { return _this.registerSuccessResponse(res); });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        if (!this.user) {
            this.logger.info('AuthService@logout: user was not stored in localStorage');
            return;
        }
        this.http.post(this.apiUrl + "/logout", { id: this.user.id })
            .subscribe(function () {
            _this.isLoggedIn = false;
            AuthService_1.clearAuthData();
            _this.router.navigate(['login']);
        });
    };
    AuthService.prototype.register = function (data) {
        AuthService_1.clearAuthData();
        return this.http.post(this.apiUrl + "/register", data);
    };
    AuthService.prototype.loginWithProvider = function (provider) {
        return this.http.post(this.apiUrl + "/oauth/" + provider, { provider: provider });
    };
    AuthService.prototype.registerSuccessResponse = function (data) {
        this.isLoggedIn = true;
        this._token = data.token;
        var expireAtDate = new Date();
        var expires_in = 0;
        try {
            expires_in = parseInt(data.expires_in, 10);
        }
        catch (e) {
            this.logger.warn('AuthService@registerSuccessResponse:' +
                ("error while parsing expires_in(" + data.expires_in + ") from response"));
            expires_in = 3600; // Laravel default expires_in value
        }
        expireAtDate.setTime(expireAtDate.getTime() + expires_in);
        localStorage.setItem('ot_auth_token', data.token);
        localStorage.setItem('ot_auth_token_expires_at', JSON.stringify(expireAtDate.getTime()));
        this.refreshUserInStorage();
    };
    AuthService.prototype.refreshUserInStorage = function () {
        var _this = this;
        this.isLoggedIn = true;
        this.http.get(this.apiUrl + "/user").pipe(operators_1.tap(function (_) { return _this.log("fetched User"); }), operators_1.catchError(this.handleError("getUser error"))).subscribe(function (user) {
            _this.setUser(user);
            _this.router.navigate([_this.defineRedirectRoute(user.role.name)]);
        });
    };
    AuthService.prototype.defineRedirectRoute = function (roleName) {
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
    };
    AuthService.prototype.setUser = function (user) {
        this._user = user;
        localStorage.setItem('ot_auth_user', JSON.stringify(user));
    };
    AuthService = AuthService_1 = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
    var AuthService_1;
}(api_request_1.ApiRequest));
exports.AuthService = AuthService;
