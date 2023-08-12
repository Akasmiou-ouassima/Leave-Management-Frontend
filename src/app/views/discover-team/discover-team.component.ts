import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-discover-team',
  templateUrl: './discover-team.component.html',
  styleUrls: ['./discover-team.component.scss']
})
export class DiscoverTeamComponent {
  @Input() isModalOpen=false;
  @Output() closePopupEvent=new EventEmitter<void>();

  closePopup(){
    this.closePopupEvent.emit();
  }
  activeTab: string = 'About';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
