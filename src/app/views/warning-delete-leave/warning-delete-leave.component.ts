import { Component , EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-warning-delete-leave',
  templateUrl: './warning-delete-leave.component.html',
  styleUrls: ['./warning-delete-leave.component.scss']
})
export class WarningDeleteLeaveComponent {
  @Input() isModalOpen = false;
  @Input() check=0;
  @Output() closeAlertEvent = new EventEmitter<void>();

  closeAlert() {
    this.closeAlertEvent.emit();
  }
}
