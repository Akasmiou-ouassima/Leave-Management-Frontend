import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-update-team-pop-up',
  templateUrl: './update-team-pop-up.component.html',
  styleUrls: ['./update-team-pop-up.component.scss']
})
export class UpdateTeamPopUpComponent {
  @Input() isModalOpen=false;
  @Output() closePopupEvent=new EventEmitter<void>();

  closePopup(){
    this.closePopupEvent.emit();
  }
}
