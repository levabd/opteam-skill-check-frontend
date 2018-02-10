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
var api_request_1 = require("../../core/api.request");
var environment_1 = require("../../../environments/environment");
var RoleService = (function (_super) {
    __extends(RoleService, _super);
    function RoleService(router, http, messageService, logger) {
        var _this = _super.call(this, router, http, messageService, logger) || this;
        _this.router = router;
        _this.http = http;
        _this.messageService = messageService;
        _this.logger = logger;
        _this.apiUrl = environment_1.environment.spa_api_domain + "/api/admin/roles";
        return _this;
    }
    /**
     * @returns {Observable<PaginationModel>}
     */
    RoleService.prototype.getRoles = function () {
        // Todo: send the message _after_ fetching the Useres
        // this.messageService.add('UserService: fetched Useres');
        return this.http.get(this.apiUrl);
    };
    RoleService = __decorate([
        core_1.Injectable()
    ], RoleService);
    return RoleService;
}(api_request_1.ApiRequest));
exports.RoleService = RoleService;
