import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-info-message',
  templateUrl: './alert-info-message.component.html',
  styleUrls: ['./alert-info-message.component.scss']
})
export class AlertInfoMessageComponent {
  showAlert = false;

  closeAlert() {
    this.showAlert = false;
  }
}
