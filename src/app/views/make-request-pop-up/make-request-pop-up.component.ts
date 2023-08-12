import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-make-request-pop-up',
  templateUrl: './make-request-pop-up.component.html',
  styleUrls: ['./make-request-pop-up.component.scss']
})
export class MakeRequestPopUpComponent {
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();

  closePopup() {
    this.closePopupEvent.emit();
  }
}
