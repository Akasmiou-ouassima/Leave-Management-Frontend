import jwtDecode from "jwt-decode";

export class Tokens {
  private _jwt: any;
  private _refreshToken: any;
  private _roles:string[];
  private _email : any;
  private _id:any

  constructor(jwt?:any, refreshToken?:any, roles?:any, email?: any, id?: any) {
    this._jwt = jwt;
    this._refreshToken = refreshToken;
    this._roles = roles;
    this._email = email;
    this._id = id;
  }

  get jwt(): any {
    return this._jwt;
  }

  set jwt(value: any) {
    this._jwt = value;
  }

  get refreshToken(): any {
    return this._refreshToken;
  }

  set refreshToken(value:any) {
    this._refreshToken = value;
  }

  public get roles(): any {
    return this._roles;
  }

  set roles(value: any) {
    this._roles = value;
  }

  get email(): any {
    return this._email;
  }

  set email(value: any) {
    this._email = value;
  }

  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = value;
  }

  isExpired(): boolean {
    let decodedToken :any= jwtDecode(this._jwt);
    let current_time = Date.now() / 1000; // Temps actuel en secondes
    if (decodedToken.exp && decodedToken.exp < current_time) {
      console.log('Le jeton est expiré.');
      return true;
    } else {
      console.log('Le jeton est valide.');
      return false;
    }
  }
}
