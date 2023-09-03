import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import {Tokens} from "../model/tokens";
import { Router } from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private route:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/login') || request.url.includes('/refreshToken')
      || request.url.includes('/forgot-password/') || request.url.includes('/reset-password/')) {

      if(request.url.includes('/login')){
        console.log("login url");
        this.authService.removeTokens();
        return next.handle(request);
      }else if(request.url.includes('/forgot-password/') || request.url.includes('/reset-password/')){
        console.log("forget or reset url");
        return next.handle(request);
      }
      else{
        console.log("refreshtoekn url ...");
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.tokens.refreshToken}`
          }
        });
        return next.handle(newRequest);
      }

    } else {
      console.log("autre url ...");
      const newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.tokens.jwt}`
        }
      });

      return next.handle(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log("error.status "+error.status);
          if (this.authService.tokens.isExpired()) {
            return this.authService.refreshToken().pipe(
              switchMap((responseUpdated : any) => {
                this.authService.updateTokens(responseUpdated );
                console.log("new token ...");
                const updatedRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${this.authService.tokens.jwt}`
                  }
                });
                return next.handle(updatedRequest);
              }),
              catchError(() => {
                this.authService.logout(); // Logout if refresh token is also invalid
                return throwError(error);
              })
            );
          } else {
            return throwError(error);
          }
        })
      );
    }
  }
}
