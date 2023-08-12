import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-add-team-pop-up',
  templateUrl: './add-team-pop-up.component.html',
  styleUrls: ['./add-team-pop-up.component.scss']
})
export class AddTeamPopUpComponent {
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();

  closePopup() {
    this.closePopupEvent.emit();
  }
}
