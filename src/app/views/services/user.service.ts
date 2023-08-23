import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendHost: string = "http://localhost:8086";

  constructor(private http: HttpClient) {
  }

  listUtilisateurs(): Observable<User[]> {
    const url = `${this.backendHost}/utilisateurs`;
    return this.http.get<User[]>(url);
  }
  listEquipe(): Observable<Array<any>> {
    const url = `${this.backendHost}/equipes`;
    return this.http.get<Array<any>>(url);
  }
  saveUtilisateur(user: User) {
    const url = `${this.backendHost}/utilisateurs`;
    return this.http.post<User>(url, user);
  }
  getUtilisateur(userId : number):Observable<User>{
    const url = `${this.backendHost}/utilisateurs/`;
    return this.http.get<User>(url+userId);

  }
  updateUtilisateur(user:User){
    const url = `${this.backendHost}/utilisateurs/`;
    return this.http.put<User>(url+user.id,user);
  }
  deleteUtilisateur(userId:number){
    const url = `${this.backendHost}/utilisateurs/`;
    return this.http.delete<User>(url+userId);
  }

  searchUtilisateurs(keyword: string): Observable<User[]> {
    const url = `${this.backendHost}/utilisateurs/search`;
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<User[]>(url, { params });
  }
  ResponsablesNb():Observable<number>{
    const url = `${this.backendHost}/nbResponsables`;
    return this.http.get<number>(url);
  }
  SalariesNb():Observable<number>{
    const url = `${this.backendHost}/nbSalaries`;
    return this.http.get<number>(url);
  }

}
