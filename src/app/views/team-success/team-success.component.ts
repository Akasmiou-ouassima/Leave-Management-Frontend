import {animate, state, style, transition, trigger } from '@angular/animations';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-team-success',
  templateUrl: './team-success.component.html',
  styleUrls: ['./team-success.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0, transform: 'translateY(-30px)' })),
      transition(':enter, :leave', [
        animate(400)
      ])
    ])
  ]
})
export class TeamSuccessComponent {
  @Input() showAlert: boolean = false;
  @Input() check!: number;
  @Output()  closePopupEvent = new EventEmitter<void>()


  closeAlert() {
    this.closePopupEvent.emit();
  }
}
