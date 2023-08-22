import { Component  , EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-success-save-leave',
  templateUrl: './success-save-leave.component.html',
  styleUrls: ['./success-save-leave.component.scss']
})
export class SuccessSaveLeaveComponent {
  @Input() isModalOpen = false;
  @Output() closeAlertEvent = new EventEmitter<void>();

  closeAlert() {
    this.closeAlertEvent.emit();
  }
}
