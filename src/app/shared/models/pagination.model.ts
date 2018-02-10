
import {Model} from './model';

export class LaravelPaginationModel {
    constructor(public data?: Model[],
                public total?: number,
                public per_page?: number,
                public current_page?: number,
                public last_page?: number,
                public first_page_url?: string,
                public last_page_url?: string,
                public next_page_url?: string,
                public prev_page_url?: string,
                public path?: string,
                public from?: number,
                public to?: number) {
    }
}


export class PaginationModel {
    constructor(public data?: Model[],
                public total?: number,
                public perPage?: number,
                public currentPage?: number,
                public lastPage?: number,
                public firstPageUrl?: string,
                public lastPageUrl?: string,
                public nextPageUrl?: string,
                public prevPageUrl?: string,
                public path?: string,
                public from?: number,
                public to?: number) {
    }

}
