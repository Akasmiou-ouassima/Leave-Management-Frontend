import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  switchLabel: string = 'Disable';

  onToggleSwitchChange(event: any) {
    this.switchLabel = event.target.checked ? 'Active' : 'Disable';
  }
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
