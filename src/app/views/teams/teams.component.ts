import {Component, OnInit, ViewChild} from '@angular/core';
import {catchError, forkJoin, map, mergeMap, Observable, of, switchMap} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Equipe} from "../model/equipe.model";
import {EquipeService} from "../services/equipe.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions = [3, 10, 20];
  currentPage = 0;
  currentPageSize = this.pageSizeOptions[0];
  pagedEquipes: Equipe[] = [];
  //-----------
  public equipes! : Array<Equipe>;
  public selectedTeam! : Equipe;
  equipeMembersCountsAndImgs: Array<{ id: number,admin:any, membersCount: number, images: string[] }> = [];
  public roleUser! :string;
  public idUserAuth! : number;
  constructor(private equipeService : EquipeService) {
  }
  ngOnInit() {
    this.getAllEquipesAndMembers();
    //get Role of user authenticated
    this.getRoleUser();
  }
  loadPagedEquipes() {
    const startIndex = this.currentPage * this.currentPageSize;
    const endIndex = startIndex + this.currentPageSize;
    this.pagedEquipes = this.equipes.slice(startIndex, endIndex);
  }
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.currentPageSize = event.pageSize;
    this.loadPagedEquipes();
  }
//--------------------
  activeTab: string = 'All';
  setActiveTab(tab: string) {
    this.activeTab = tab;
    if( this.activeTab=="All"){
      this.getAllEquipesAndMembers();
    }else{
      this.getMyEquipesAndMembers(9);
    }
  }
  getAllEquipesAndMembers(){
    this.getEquipes()
      .pipe(
        switchMap(() => this.calculateMembersCountsAndImages())
      )
      .subscribe(() => {
        this.loadPagedEquipes();
      });

  }
  getMyEquipesAndMembers(idUser:number){
    this.getMyEquipes(idUser)
      .pipe(
        switchMap(() => this.calculateMembersCountsAndImages())
      )
      .subscribe(() => {
        this.loadPagedEquipes();
      });
  }
  //
  showPopup = false;
  closePopup() {
    this.showPopup = false;
  }

  showPopup1 = false;

  update(equipe : Equipe) {
    this.showPopup1 = true;
    this.selectedTeam=equipe;
  }
  discover(equipe : Equipe){
    console.log("discover ...");
    this.selectedTeam=equipe;
    this.showPopup2 = true
  }
  closePopup1() {
    this.showPopup1 = false;
  }
  showPopup2 = false;
  closePopup2() {
    this.showPopup2 = false;
  }
  //delete team
  showPopupDelete = false;
  closePopupDelete() {
    this.showPopupDelete = false;
  }
  getEquipes() {
    console.log("getequipes ....");
    return this.equipeService.getEquipes()
      .pipe(
        map(data => {
          this.equipes = data;
          console.log("data " + data);
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des équipes:', error);
          return of(null);
        })
      );
  }
  getMyEquipes(id:number) {
    console.log("getMyEquipes ....");
    return this.equipeService.getEquipesByUser(id)
      .pipe(
        map(data => {
          this.equipes = data;
          console.log("data " + data);
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des équipes:', error);
          return of(null);
        })
      );
  }
  calculateMembersCountsAndImages(): Observable<void> {
    const observables = this.equipes.map(equipe => {
      return this.equipeService.getMemebersEquipe(equipe.id).pipe(
        switchMap(members => {
          const limitedImages = members.slice(0, 3).map(member => member.image);
          return this.equipeService.getUser(equipe.responsableId).pipe(
            switchMap(result => {
              return of({
                id: equipe.id,
                admin: result,
                membersCount: members.length,
                images: limitedImages
              });
            })
          );
        })
      );
    });

    return forkJoin(observables).pipe(
      map((results: Array<{
        id: number,
        admin: any,
        membersCount: number,
        images: string[]
      }>) => {
        this.equipeMembersCountsAndImgs = results;
      }),
      switchMap(() => of())
    );
  }


  getMembersCountForEquipe(equipeId: number): number {
    const equipe =
      this.equipeMembersCountsAndImgs.find(item => item.id === equipeId);
    return equipe ? equipe.membersCount : 0;
  }
  getMembersImgsForEquipe(equipeId: number):string[]{
    const equipe =
      this.equipeMembersCountsAndImgs.find(item => item.id === equipeId);
    return equipe ? equipe.images : [];
  }
  getRespo(equipeId: number):any{
    const equipe =
      this.equipeMembersCountsAndImgs.find(item => item.id === equipeId);
    return equipe ? equipe.admin :'';
  }
  addTeam(equipe : Equipe) {
    this.equipes.push(equipe);
  }
  updateTeam(equipe : Equipe) {
    console.log("id "+equipe.id+" nom "+equipe.nom)
    this.equipes=  this.equipes.map(e=>e.id==equipe.id?equipe:e);

  }

  delete(equipe: Equipe) {
    this.selectedTeam=equipe;
    this.showPopupDelete=true;
  }
  deleteTeam(equipe : Equipe) {
    this.equipes=this.equipes.filter(e=>e.id!=equipe.id);
  }
  //
  getRoleUser(){
    this.idUserAuth=9;
    this.roleUser=this.equipeService.getRoleUser(this.idUserAuth);
  }

}
