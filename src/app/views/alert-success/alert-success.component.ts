import {Component} from '@angular/core';


@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.scss']
})
export class AlertSuccessComponent {
  showAlert = false;

  closeAlert() {
    this.showAlert = false;
  }
}
