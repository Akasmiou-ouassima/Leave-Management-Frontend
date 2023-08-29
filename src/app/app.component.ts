import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {AuthService} from "./views/services/auth.service";
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  currentRoute!: string;

  constructor(
    private router: Router,private authService : AuthService,private route: ActivatedRoute
  ,private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    console.log("previous url "+this.currentRoute);
    this.router.navigateByUrl(this.currentRoute);
  }
  getCurrentUrlBeforeRefresh(): string {
    const currentUrl = this.location.path();
    return currentUrl;
  }
  ngOnInit(): void {
    const currentUrl = this.getCurrentUrlBeforeRefresh();
    this.router.navigateByUrl(currentUrl)
    console.log('Current URL before refresh:', currentUrl);
    this.authService.getTokens();
  }
}

