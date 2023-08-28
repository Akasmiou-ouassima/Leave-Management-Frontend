import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,  HttpParams } from '@angular/common/http';
import {Conge} from "../model/conge.model";
import {User} from "../model/user.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeavesUserService {
  private baseURL= "http://localhost:8086";
  constructor(private httpClient: HttpClient) { }
  getCongesByUtilisateur(id:number):Observable<Conge[]>{
    return this.httpClient.get<Conge[]>(this.baseURL+"/conges/ByUser/"+id);
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
  getNbCongesPending():Observable<number>{
    const url = `${this.baseURL}/nbCongesPending`;
    return this.httpClient.get<number>(url);
  }
  getNbCongesApproved():Observable<number>{
    const url = `${this.baseURL}/nbCongesApproved`;
    return this.httpClient.get<number>(url);
  }
  getNbCongesRefused():Observable<number>{
    const url = `${this.baseURL}/nbCongesRefused`;
    return this.httpClient.get<number>(url);
  }
  getCongesByManager(managerId: number): Observable<Conge[]> {
    const url = `${this.baseURL}/conges/ByManager/${managerId}`;
    return this.httpClient.get<Conge[]>(url);
  }
  uploadCongePdf(congeId: number, file: File ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.put(`${this.baseURL}/conges/${congeId}/uploadPdf`,formData);
  }
  getNbCongesByUserByEtat(userId: number,etat:string): Observable<number> {
    const url = `${this.baseURL}/nbCongesByUser/${userId}/By/${etat}`;
    return this.httpClient.get<number>(url);
  }
  getNbCongesByUser(id: number): Observable<number> {
    const url = `${this.baseURL}/nbCongesBySalarie/${id}`;
    return this.httpClient.get<number>(url);
  }
  getNbCongesByMoisAnnee(mois:number,annee:number,etat:string): Observable<number>{
    console.log("mois "+mois+"annee "+annee);
    const url = `${this.baseURL}/nbConges/${etat}/By/${mois}/${annee}`;
    return this.httpClient.get<number>(url);
  }
}
