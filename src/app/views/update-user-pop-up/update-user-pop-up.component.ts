import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-update-user-pop-up',
  templateUrl: './update-user-pop-up.component.html',
  styleUrls: ['./update-user-pop-up.component.scss']
})
export class UpdateUserPopUpComponent {
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();

  closePopup1() {
    this.closePopupEvent.emit();
  }
}
