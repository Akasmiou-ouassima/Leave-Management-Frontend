import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {Appuser} from "../model/appuser";
import {EditProfileRequest} from "../model/edit-profile-request";
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
  uploadUserPhoto(userId: number, file: File ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.put(`${this.backendHost}/utilisateurs/${userId}/uploadPhoto`,formData);
  }
  editProfile(user: User, newPassword: string): Observable<[User, String]> {
    const url = `${this.backendHost}/editProfil/${user.id}`;
    const request: EditProfileRequest = { user, newPassword };
    return this.http.put<[User, String]>(url, request);
  }
  getAppUserById(id: number): Observable<Appuser> {
    const url = `${this.backendHost}/users/${id}`;
    return this.http.get<Appuser>(url);
  }
}
