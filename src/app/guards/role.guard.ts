import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getRole(); 

    if (userRole && expectedRoles.includes(userRole)) {
      return true;
    }

    this.router.navigate(['/unauthorized']); 
    return false;
  }
}
