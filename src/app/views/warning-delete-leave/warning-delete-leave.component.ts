import {animate, state, style, transition, trigger } from '@angular/animations';
import { Component , EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-warning-delete-leave',
  templateUrl: './warning-delete-leave.component.html',
  styleUrls: ['./warning-delete-leave.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0, transform: 'translateY(-30px)' })),
      transition(':enter, :leave', [
        animate(400)
      ])
    ])
  ]
})
export class WarningDeleteLeaveComponent {
  @Input() isModalOpen = false;
  @Input() check=0;
  @Output() closeAlertEvent = new EventEmitter<void>();

  closeAlert() {
    this.closeAlertEvent.emit();
  }
}
