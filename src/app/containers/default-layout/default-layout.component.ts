import {Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/views/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit{
  currentNavItem!: string;
  roles!: string | null;


  constructor(private authService : AuthService) {

  }
  setCurrentNavItem(item: string) {
    this.currentNavItem = item;
  }
  ngOnInit() {
    this.roles = localStorage.getItem("roles");
  }
}

