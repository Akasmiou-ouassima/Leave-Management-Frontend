import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import {Equipe} from "../model/equipe.model";
@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private readonly path: string = "http://localhost:8086/";
  constructor(private http:HttpClient) { }

  public  getEquipes():Observable<Array<Equipe>>{
    return this.http.get<Array<Equipe>>(this.path+"equipes");
  }
  public  getEquipesByUser(id:number):Observable<Array<Equipe>>{
    return this.http.get<Array<Equipe>>(this.path+"equipes/ByUser/"+id);
  }
  public  getEquipe(id:number):Observable<Equipe>{
    return this.http.get<Equipe>(this.path+"equipes/"+id);
  }

  public  getUsers():Observable<Array<any>>{
    return this.http.get<Array<any>>(this.path+"utilisateurs");
  }
  public  getUser(id:number):Observable<any>{
    console.log("get user service ..");
    return this.http.get<any>(this.path+"utilisateurs/"+id);
  }
  public  getMemebersEquipe(id:number):Observable<Array<any>>{
    console.log("in fct getMembers ....");
    return this.http.get<Array<any>>(this.path+"membersEquipe/"+id);
  }
  deleteEquipe(equipeId: number): Observable<boolean> {
    console.log("delete equipe "+equipeId);
    return this.http.delete<boolean>(`${this.path}equipes/${equipeId}`);
  }
  public  addEquipe(equipe :Equipe):Observable<Equipe>{
    return this.http.post<Equipe>(this.path+"equipes",equipe);
  }

  uploadTeamPhoto(equipeId: number, file: File ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.put(`${this.path}equipes/${equipeId}/uploadPhoto`,formData);
  }
  public  updateEquipe(equipe :Equipe):Observable<Equipe>{
    return this.http.put<Equipe>(this.path+"equipes/"+equipe.id,equipe);
  }

  public getUsersWithoutMembers(id: number): Observable<Array<any>> {
    return this.getMemebersEquipe(id).pipe(
      switchMap(members => {
        return this.getUsers().pipe(
          map(users => {
            const userIdsToRemove = new Set(members.map(member => member.id));
            const usersWithoutMembers = users.filter(user => !userIdsToRemove.has(user.id));
            const usersWithoutAdmin = usersWithoutMembers.filter(user => user.id!=1);
            return usersWithoutAdmin;
          })
        );
      })
    );
  }
  public  getRoleUser(id:number){
    return this.http.get(`${this.path}roleUser/${id}`);
  }

  EquipesNb():Observable<number>{
    const url = this.path+"nbequipes";
    return this.http.get<number>(url);
  }
}
