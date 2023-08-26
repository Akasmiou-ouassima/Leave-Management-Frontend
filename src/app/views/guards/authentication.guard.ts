import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthService,private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.authService.isAuthenticated) {
      console.log("AuthenticationGuard ..true.");
      return true;
    } else {
      console.log("AuthenticationGuard ..false.");
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
