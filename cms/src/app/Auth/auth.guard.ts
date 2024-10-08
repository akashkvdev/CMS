import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AllServiceService } from '../Services/all-service.service';

@Injectable({
  providedIn: 'root', // or specify a module if needed
})
export class AuthGuard implements CanActivate {

  constructor(private service: AllServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Your authentication logic here
    if (this.service.isAuthenticated()) {
      return true; // User is authenticated, allow access
    } else {
      // User is not authenticated, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
