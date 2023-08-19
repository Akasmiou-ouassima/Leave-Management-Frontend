import {Component, ElementRef, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {
  showPopup = false;
  closePopup() {
    this.showPopup = false;
  }

  showPopup1 = false;
  closePopup1() {
    this.showPopup1 = false;
  }

  showPopup2 = false;
  closePopup2() {
    this.showPopup2 = false;
  }

  activeTab: string = 'About';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  submitForm(): void {
    const formData = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      description: (document.getElementById('description') as HTMLTextAreaElement).value,
      manager: (document.getElementById('manager') as HTMLSelectElement).value,
    };
  }
}
