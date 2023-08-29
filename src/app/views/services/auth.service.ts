import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {Tokens} from "../model/tokens";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly path: string = "http://localhost:8086";
  isAuthenticated : boolean=false;
  tokens : Tokens = new Tokens();
  routeStateService: any;
  constructor(private http:HttpClient,private router : Router) { }
  public login(email:string,password:string){
    this.logout();
    let params = new HttpParams().set("email",email).set("password",password);
    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post(`${this.path}/login`,params,options);
  }
  isAdmin(): boolean {
    let admin: boolean = false;

    if (Array.isArray(this.tokens.roles)) {
      this.tokens.roles.forEach((r: string) => {
        if (r === "ADMIN") {
          admin = true;
        }
      });
    }
    console.log("admin check..."+admin);
    return admin;
  }

  isSalarie() {
    console.log("Salarie check...");
    let salarie: boolean = false;
    if (Array.isArray(this.tokens.roles)) {
      this.tokens.roles.forEach((r: string) => {
        if (r == "SALARIE") {
          salarie = true;
        }
      })
    }
    return salarie;

  }
  isResponsable(){
    console.log("Responsable check...");
    let respo:boolean  = false;
    if (Array.isArray(this.tokens.roles)) {
      this.tokens.roles.forEach((r: string) => {
        if (r == "RESPONSABLE") {
          respo = true;
        }
      })
    }
    return respo;
  }

  loadProfile(reponse: any) {
    console.log("load profile ...");
    this.isAuthenticated=true;
    let accessToken = reponse['access-token'];

    let jwtDecoder : any =jwtDecode(accessToken);
    console.log("jwtDecoder "+JSON.stringify(jwtDecoder));
    this.tokens.email=jwtDecoder.sub;
    this.tokens.roles= jwtDecoder.roles;
    this.tokens.jwt=reponse['access-token'];
    this.tokens.refreshToken=reponse['refresh-token'];
    this.tokens.id=reponse['id'];

    this.storeTokens(this.tokens);
    console.log("tokens "+JSON.stringify(this.tokens),"acc-tok "+accessToken);
  }

  logout() {
    this.isAuthenticated=false;
    this.removeTokens();
    this.router.navigateByUrl("/login");

  }
  private storeTokens(tokens: Tokens) {
    console.log("store tokens ...");
    window.localStorage.clear();
    localStorage.setItem("access-token", tokens.jwt);
    localStorage.setItem("refresh-token", tokens.refreshToken);
    localStorage.setItem("roles",tokens.roles);
    localStorage.setItem("email",tokens.email);
    localStorage.setItem("id",tokens.id);
  }
  removeTokens() {
    console.log("remove tokens...");
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("roles");
    localStorage.removeItem("email");
    localStorage.removeItem("id");

    // window.sessionStorage.clear();
  }
  getRefreshToken() {
    return localStorage.getItem("refresh-token");
  }
  getAccessToken() {
    return localStorage.getItem("access-token");
  }


  refreshToken() {
    console.log("refreshToken() call fct");
    return this.http.get<any>(this.path+'/refreshToken');
  }
  updateTokens(responseUpdated:any) {

    console.log("update tokens "+JSON.stringify(responseUpdated));
    this.tokens.jwt=responseUpdated['access-token'];
    this.tokens.refreshToken=responseUpdated['refresh-token'];
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.setItem("access-token", this.tokens.jwt);
    localStorage.setItem("refresh-token", this.tokens.refreshToken);

  }

  getTokens() {
    this.tokens.jwt= localStorage.getItem("access-token");
    this.tokens.refreshToken=localStorage.getItem("refresh-token");
    let jwtDecoder : any =jwtDecode(this.tokens.jwt);
    this.tokens.roles= jwtDecoder.roles;
    this.tokens.email=localStorage.getItem("email");
    this.tokens.id=localStorage.getItem("id");
    console.log("get tokens ..."+JSON.stringify(this.tokens));

    if(this.tokens.jwt!=undefined){
      this.isAuthenticated=true;
     this.router.navigateByUrl("/dashboard");
    }


  }


  requestPasswordforget(email: any) {
    console.log("email to validate call fct");
    return this.http.get<any>(this.path+'/forgot-password/'+email);
  }

  requestPasswordReset(password: any,token:any) {
    console.log("renew password call fct"+password+" token "+token);
    return this.http.get<any>(this.path+'/reset-password/'+token+'/'+password);
  }
}
