import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-edit-request-pop-up',
  templateUrl: './edit-request-pop-up.component.html',
  styleUrls: ['./edit-request-pop-up.component.scss']
})
export class EditRequestPopUpComponent {
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();

  closePopup() {
    this.closePopupEvent.emit();
  }
}
