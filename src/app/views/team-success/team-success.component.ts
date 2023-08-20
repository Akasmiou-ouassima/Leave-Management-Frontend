import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-team-success',
  templateUrl: './team-success.component.html',
  styleUrls: ['./team-success.component.scss']
})
export class TeamSuccessComponent {
  @Input() showAlert: boolean = false;
  @Input() title !: string;
  @Input() description !: string;
  @Output()  closePopupEvent = new EventEmitter<void>()


  closeAlert() {
    this.closePopupEvent.emit();
  }
}
