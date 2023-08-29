import {animate, state, style, transition, trigger } from '@angular/animations';
import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-error-delete-team',
  templateUrl: './error-delete-team.component.html',
  styleUrls: ['./error-delete-team.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0, transform: 'translateY(-30px)' })),
      transition(':enter, :leave', [
        animate(400)
      ])
    ])
  ]
})
export class ErrorDeleteTeamComponent {
  @Input() showAlert = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  closeAlert() {
    this.closePopupEvent.emit();
  }
}
