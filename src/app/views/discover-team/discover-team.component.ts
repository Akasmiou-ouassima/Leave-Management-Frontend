import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Equipe} from "../model/equipe.model";
import {EquipeService} from "../services/equipe.service";

@Component({
  selector: 'app-discover-team',
  templateUrl: './discover-team.component.html',
  styleUrls: ['./discover-team.component.scss']
})
export class DiscoverTeamComponent{
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Input() team!: Equipe;
  members: Array<any> = [];
  constructor(private equipeService: EquipeService) {
  }
  closePopup() {
    this.closePopupEvent.emit();
  }

  activeTab: string = 'About';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.isModalOpen === true) {
      console.log('isModalOpen changed to true!');
      this.getMembers();
    }
  }
  getMembers() {
    console.log("loading members ...."+this.team?.id);
    this.equipeService.getMemebersEquipe(this.team?.id).subscribe({
      next: data => {
        this.members=data;
        this.members.forEach(mem=>{
          console.log("email : " +mem.email);
        })
      },
      error: err => {
        console.log("err :"+err);
      }
    });
  }

  getType(type : string){
    switch (type){
      case "RESPONSABLE" : return "Manager";
      case "SALARIE" : return "Employee";
      default : return "";
    }
  }
}
