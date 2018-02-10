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
var operators_1 = require("rxjs/operators");
var api_request_1 = require("../../../core/api.request");
var environment_1 = require("../../../../environments/environment");
var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService(router, http, messageService, logger) {
        var _this = _super.call(this, router, http, messageService, logger) || this;
        _this.router = router;
        _this.http = http;
        _this.messageService = messageService;
        _this.logger = logger;
        _this.apiUrl = environment_1.environment.spa_api_domain + "/api/admin/users";
        return _this;
    }
    /**
     * Get list of users
     * @param {UserListFilter} filter
     * @returns {Observable<PaginationModel>}
     */
    UserService.prototype.getUsers = function (filter) {
        var _this = this;
        // Todo: send the message _after_ fetching the Useres
        // this.messageService.add('UserService: fetched Useres');
        return this.http.get(this.apiUrl, { params: this.toHttpParams(filter) }).pipe(operators_1.tap(function (users) { return _this.log("fetched users"); }), operators_1.catchError(this.handleError('getUsers', [])));
    };
    /** GET User by id. Will 404 if id not found */
    UserService.prototype.getUserForUpdate = function (id) {
        var _this = this;
        var url = this.apiUrl + "/" + id + "/edit";
        return this.http.get(url).pipe(operators_1.tap(function (_) { return _this.log("fetched User id=" + id); }), operators_1.catchError(this.handleError("getUser id=" + id)));
    };
    /** PUT: update the User on the server */
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        return this.http.post(this.apiUrl + "/" + user.id, user).pipe(operators_1.tap(function (_) { return _this.log("updated User id=" + user.id); }), operators_1.catchError(this.handleError('updateUser')));
    };
    /** POST: add a new User to the server */
    UserService.prototype.addUser = function (user) {
        var _this = this;
        return this.http.post(this.apiUrl, user).pipe(operators_1.tap(function (user) { return _this.log("added user w/ id=" + user.id); }), operators_1.catchError(this.handleError('addUser')));
    };
    /** DELETE: delete the user from the server */
    UserService.prototype.deleteUser = function (user) {
        var _this = this;
        var id = typeof user === 'number' ? user : user.id;
        var url = this.apiUrl + "/" + id;
        return this.http.delete(url).pipe(operators_1.tap(function (_) { return _this.log("deleted user id=" + id); }), operators_1.catchError(this.handleError('deleteUser')));
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}(api_request_1.ApiRequest));
exports.UserService = UserService;
