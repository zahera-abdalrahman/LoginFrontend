import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }

    const allowedRoles = route.data['roles'] as string[];
    const role = this.auth.getRole();

    if (allowedRoles && allowedRoles.indexOf(role) === -1) {
      this.router.navigate(['/forbidden']);
      return false;
    }

    return true;
  }
}
