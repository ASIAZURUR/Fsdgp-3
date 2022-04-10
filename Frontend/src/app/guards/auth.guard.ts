import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            //  this.authService.getCurrentUser();
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    canActivateChild() {
        return new Promise<boolean>((resolve) => {
            let currentUser = this.authService.getCurrentUser();
            if (!currentUser) {
                this.authService.setCurrentUser().then(res => {
                    currentUser = this.authService.getCurrentUser();
                    if (currentUser) {
                        resolve(true);
                    } else {
                        resolve(false)
                    }
                }).catch(err => {
                    resolve(false);
                })
            } else {
                resolve(true);
            }
        })
    }
}