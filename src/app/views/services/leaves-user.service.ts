import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,  HttpParams } from '@angular/common/http';
import {Conge} from "../model/conge.model";
import {User} from "../model/user.model";


@Injectable({
  providedIn: 'root'
})
export class LeavesUserService {
  private baseURL= "http://localhost:8086";
  constructor(private httpClient: HttpClient) { }
  getCongesByUtilisateur(id:number):Observable<Conge[]>{
    return this.httpClient.get<Conge[]>(this.baseURL+"/conges/ByUser/"+id); // need to change '1' to "id" when we do link the login page
  }
  updateConge(conge:Conge){
    const url = `${this.baseURL}/conges/`;
    return this.httpClient.put<Conge>(url+conge.id,conge);
  }
  deleteConge(id: number): Observable<Object>{
    return this.httpClient.delete(this.baseURL+"/conges/"+id);
  }
  saveConge(conge:Conge): Observable<Conge>{
    return this.httpClient.post<Conge>(this.baseURL+"/conges",conge);
  }

  listConge():Observable<Conge[]>{
    return this.httpClient.get<Conge[]>(this.baseURL+"/conges");
  }
  searchCongeByUser(userId: number, keyword: string): Observable<Conge[]> {
    const url = `${this.baseURL}/conges/ByUser/${userId}/search`;
    const params = new HttpParams().set('keyword', keyword);
    return this.httpClient.get<Conge[]>(url, { params });
  }
  getCongeById(id: number): Observable<Conge> {
    return this.httpClient.get<Conge>(`${this.baseURL}/conges/${id}`);
  }
  accepterConge(id: number): Observable<any> {
    const url = `${this.baseURL}/accepter/${id}`;
    return this.httpClient.put(url, {});
  }
  refuserConge(id: number): Observable<any> {
    const url = `${this.baseURL}/refuser/${id}`;
    return this.httpClient.put(url, {});
  }
  getCongesAccepted():Observable<Conge[]>{
    const url = `${this.baseURL}/CongesAccepted`;
    return this.httpClient.get<Conge[]>(url);
  }
}
