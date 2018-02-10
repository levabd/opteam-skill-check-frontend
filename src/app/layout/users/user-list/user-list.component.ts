import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/users.service';
import {PaginationModel} from '../../../shared/models/pagination.model';

import {LoggerService} from '../../../core/logger.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
    pagination = new PaginationModel();
    filterForm: FormGroup;

    get search() {
        return this.filterForm.get('search');
    }

    get role() {
        return this.filterForm.get('role');
    }

    get page() {
        return this.filterForm.get('page');
    }


    constructor(private userService: UserService,
                private logger: LoggerService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.filterForm = this.fb.group({
            search: new FormControl(''),
            role: new FormControl('all'),
            page: new FormControl(1),
        });
        this.getUsers();
    }

    /**
     * Get user according to page filter
     *
     * @param {object|number}param - if object: from radio change event
     *                               if number: from pagination event.
     * @return void
     */
    getUsers(param?: any): void {
        const nextPage = typeof(param) === 'number' ? param : 1;
        this.filterForm.get('page').setValue(nextPage);
        if (this.filterForm.invalid) {
            this.search.markAsTouched();
            this.role.markAsTouched();
            this.page.markAsTouched();
            this.logger.info(`UserListComponent@getUsers - invalid form data ${this.filterForm.value}`);
            return;
        }

        this.userService
            .getUsers(this.filterForm.value)
            .subscribe(
                pagination => this.pagination = this.userService.mapPagination(pagination)
            );
    }

    deleteUser(userId) {
        this.userService.deleteUser(userId)
            .subscribe(() => {
                if (this.pagination.total <= 1) {
                    this.getUsers();
                    return;
                }
                if (this.pagination.currentPage === this.pagination.lastPage) {
                    this.getUsers(this.pagination.currentPage - 1);
                    return;
                }
                this.getUsers(this.pagination.currentPage);
            });
    }

    handleRefusalToSetEmail(event) {
        console.log(event);
    }
}
