"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LaravelPaginationModel = (function () {
    function LaravelPaginationModel(data, total, per_page, current_page, last_page, first_page_url, last_page_url, next_page_url, prev_page_url, path, from, to) {
        this.data = data;
        this.total = total;
        this.per_page = per_page;
        this.current_page = current_page;
        this.last_page = last_page;
        this.first_page_url = first_page_url;
        this.last_page_url = last_page_url;
        this.next_page_url = next_page_url;
        this.prev_page_url = prev_page_url;
        this.path = path;
        this.from = from;
        this.to = to;
    }
    return LaravelPaginationModel;
}());
exports.LaravelPaginationModel = LaravelPaginationModel;
var PaginationModel = (function () {
    function PaginationModel(data, total, perPage, currentPage, lastPage, firstPageUrl, lastPageUrl, nextPageUrl, prevPageUrl, path, from, to) {
        this.data = data;
        this.total = total;
        this.perPage = perPage;
        this.currentPage = currentPage;
        this.lastPage = lastPage;
        this.firstPageUrl = firstPageUrl;
        this.lastPageUrl = lastPageUrl;
        this.nextPageUrl = nextPageUrl;
        this.prevPageUrl = prevPageUrl;
        this.path = path;
        this.from = from;
        this.to = to;
    }
    return PaginationModel;
}());
exports.PaginationModel = PaginationModel;
