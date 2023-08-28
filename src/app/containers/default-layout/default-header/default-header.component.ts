import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/views/model/user.model';
import { UserService } from 'src/app/views/services/user.service';
import {AuthService} from "../../../views/services/auth.service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  userId: any;

  constructor(private userService: UserService,private authService : AuthService,private router: Router) {
    super();
    this.getUser(this.authService.tokens.id);
  }
  user!: User;

  getUser(userId: number) {
    this.userService.getUtilisateur(userId).subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.error('Error preloading user data:', error);
      }
    );
  }
  hundleLogout() {
    this.authService.logout();
  }
  
  ngOnInit(): void {
    if (localStorage.getItem("id") != undefined) {
      this.userId = localStorage.getItem("id");
    }
  }

}

