import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './users.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserModel} from './users.model';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

    it('should list the users', () => {
        const userService = TestBed.get(UserService);
        const http = TestBed.get(HttpTestingController);
        // fake response
        const expectedUsers = [{ name: 'Cédric' }];

        let actualUsers = [];
        userService.getUsers().subscribe((users: Array<UserModel>|any) => {
            actualUsers = users;
        });

        http.expectOne('/api/users').flush(expectedUsers);

        expect(actualUsers).toEqual(expectedUsers);
    });
});
