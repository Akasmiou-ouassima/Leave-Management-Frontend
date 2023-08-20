import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-error-delete-team',
  templateUrl: './error-delete-team.component.html',
  styleUrls: ['./error-delete-team.component.scss']
})
export class ErrorDeleteTeamComponent {
  @Input() showAlert = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  closeAlert() {
    this.closePopupEvent.emit();
  }
}
