import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivateChild {
    constructor(private router: Router) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const token = window.localStorage.getItem('token');

        if (token === 'accepted') {
            return Promise.resolve(true);
        }

        this.router.navigate(['auth'], {
            queryParams: { redirectUrl: location.href }
        });
        return Promise.resolve(false);
    }
}