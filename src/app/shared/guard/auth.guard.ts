import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate() {
        if (this.authService.isLoggedIn || this.authService.token) {
            return true;
        }
        this.authService.logout();
        return false;
    }
}
