import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-add-user-pop-up',
  templateUrl: './add-user-pop-up.component.html',
  styleUrls: ['./add-user-pop-up.component.scss']
})
export class AddUserPopUpComponent {
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();

  closePopup() {
    this.closePopupEvent.emit();
  }
}
