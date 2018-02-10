"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var environment_1 = require("../../../environments/environment");
var window_options_1 = require("./window.options");
var auth_service_1 = require("./auth.service");
exports.EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var AuthBase = (function () {
    function AuthBase(router, authService, http, fb) {
        this.router = router;
        this.authService = authService;
        this.http = http;
        this.fb = fb;
        this.formErrors = [];
    }
    AuthBase_1 = AuthBase;
    AuthBase.unRegisterAllEventListeners = function (obj) {
        if (typeof obj._eventListeners === 'undefined' || obj._eventListeners.length === 0) {
            return;
        }
        for (var i = 0, len = obj._eventListeners.length; i < len; i++) {
            var e = obj._eventListeners[i];
            obj.removeEventListener(e.event, e.callback);
        }
        obj._eventListeners = [];
    };
    AuthBase.defineRedirectRoute = function (roleName) {
        switch (roleName) {
            case 'admin':
                return 'admin/dashboard';
            case 'trainee':
                return 'dashboard';
            case 'trainer':
                return 'admin/dashboard';
            default:
                return 'dashboard';
        }
    };
    AuthBase.prototype.ngOnInit = function () {
        this.facebookAvailable = environment_1.environment.facebookAuth;
        this.linkedInAvailable = environment_1.environment.linkedinAuth;
        var vm = this;
        var onMessage = function (e) {
            if (environment_1.environment.spa_api_domain !== e.origin || !e.data.token || !e.data.expires_in) {
                return;
            }
            vm.authService.registerSuccessResponse(e.data);
        };
        window.addEventListener('message', onMessage);
    };
    AuthBase.prototype.ngOnDestroy = function () {
        AuthBase_1.unRegisterAllEventListeners(window);
    };
    AuthBase.prototype.login = function (email, password) {
        var _this = this;
        this.authService.login({ email: email, password: password })
            .subscribe(function () { }, function (res) { return (res.status === 422) && (_this.setFormErrors(res.error.errors)); });
    };
    AuthBase.prototype.onSocial = function (provider) {
        var _this = this;
        this.authService.loginWithProvider(provider)
            .subscribe(function (r) { return _this.openWindow(r.url, 'Text', new window_options_1.WindowOptions()); }, function (response) {
            if (response.status === 400 && response.error.error === 'Already authenticated.') {
                // noinspection JSIgnoredPromiseFromCall
                _this.router.navigate([_this.authService.redirectUrl]);
            }
        });
    };
    AuthBase.prototype.openWindow = function (url, title, windowOptions) {
        if (typeof url === 'object') {
            windowOptions = url;
            url = '';
        }
        windowOptions = __assign({ url: url, title: title, width: 600, height: 720 }, windowOptions);
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : 200;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : 200;
        var width = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
        var height = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
        windowOptions.left = ((width / 2) - (windowOptions.width / 2)) + dualScreenLeft;
        windowOptions.top = ((height / 2) - (windowOptions.height / 2)) + dualScreenTop;
        var optionsStr = Object.keys(windowOptions).reduce(function (acc, key) {
            acc.push(key + "=" + windowOptions[key]);
            return acc;
        }, []).join(',');
        var newWindow = window.open(url, title, optionsStr);
        if (window.focus) {
            newWindow.focus();
        }
        return newWindow;
    };
    AuthBase.prototype.setFormErrors = function (errors) {
        if (errors === void 0) { errors = {}; }
        this.formErrors = [];
        for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
                this.formErrors.push(errors[key]);
            }
        }
    };
    AuthBase = AuthBase_1 = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpClientModule],
            providers: [auth_service_1.AuthService, http_1.HttpClient, forms_1.FormBuilder]
        })
    ], AuthBase);
    return AuthBase;
    var AuthBase_1;
}());
exports.AuthBase = AuthBase;
