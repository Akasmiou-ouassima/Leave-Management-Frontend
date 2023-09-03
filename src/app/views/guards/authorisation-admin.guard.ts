import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
export class AuthorisationAdminGuard implements CanActivate {
  constructor(private authService: AuthService,private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("AuthorisationGuard : admin");
    if(this.authService.isAdmin()){
      return true;
    }else{
      this.router.navigateByUrl("/not-authorized");
      return false;
    }
  }
}
