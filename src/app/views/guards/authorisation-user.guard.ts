import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorisationUserGuard implements CanActivate {
  constructor(private authService: AuthService,private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("AuthorisationGuard .user.");
    if(this.authService.isSalarie()){
      return true;
    }else{
      this.router.navigateByUrl("/not-authorized");
      return false;
    }
  }
}
