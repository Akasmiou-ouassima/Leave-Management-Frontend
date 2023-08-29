import {animate, state, style, transition, trigger } from '@angular/animations';
import { Component  , EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-success-save-leave',
  templateUrl: './success-save-leave.component.html',
  styleUrls: ['./success-save-leave.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0, transform: 'translateY(-30px)' })),
      transition(':enter, :leave', [
        animate(400)
      ])
    ])
  ]
})
export class SuccessSaveLeaveComponent {
  @Input() isModalOpen = false;
  @Output() closeAlertEvent = new EventEmitter<void>();
  
  closeAlert() {
    this.closeAlertEvent.emit();
  }
}
