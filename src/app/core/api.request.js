"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/common/http");
var pagination_model_1 = require("../shared/models/pagination.model");
var ApiRequest = (function () {
    function ApiRequest(router, http, messageService, logger) {
        this.router = router;
        this.http = http;
        this.messageService = messageService;
        this.logger = logger;
    }
    ApiRequest.isErrorWithStatus = function (err, status) {
        return err instanceof http_1.HttpErrorResponse && err.status === status;
    };
    ApiRequest.prototype.toHttpParams = function (params) {
        return Object.getOwnPropertyNames(params)
            .reduce(function (p, key) { return p.set(key, params[key]); }, new http_1.HttpParams());
    };
    /** Log a UserService message with the MessageService */
    ApiRequest.prototype.log = function (message) {
        this.messageService.add('UserService: ' + message);
        this.logger.info('ApiRequest@log: ' + message);
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    ApiRequest.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            // console.log(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            if (ApiRequest.isErrorWithStatus(error, 401)) {
                _this.log(operation + " failed: " + error.message);
                // noinspection JSIgnoredPromiseFromCall
                _this.router.navigate(['login']);
            }
            if (ApiRequest.isErrorWithStatus(error, 400) && (error.error && error.error.error === 'Already authenticated.')) {
                _this.log('You are already authorised - you will be redirected to home page');
            }
            return Observable_1.Observable.throw('Error while ApiRequest');
        };
    };
    /**
     * Convert Laraval's snake_case pagination to lowerCamelCase
     * @param {LaravelPaginationModel} response - response from Laravel API
     * @returns {PaginationModel}
     */
    ApiRequest.prototype.mapPagination = function (response) {
        return new pagination_model_1.PaginationModel(response.data, response.total, response.per_page, response.current_page, response.last_page, response.first_page_url, response.last_page_url, response.next_page_url, response.prev_page_url, response.path, response.from, response.to);
    };
    ApiRequest.prototype.setFormErrors = function (errors) {
        if (errors === void 0) { errors = {}; }
        var formErrors = [];
        for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
                formErrors.push(errors[key]);
            }
        }
        return formErrors;
    };
    return ApiRequest;
}());
exports.ApiRequest = ApiRequest;
