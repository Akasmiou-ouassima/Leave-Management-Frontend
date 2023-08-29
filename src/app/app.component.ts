import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {AuthService} from "./views/services/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  currentRoute!: string;

  constructor(
    private router: Router,private authService : AuthService,private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    console.log("previous url "+this.currentRoute);
    this.router.navigateByUrl(this.currentRoute);
  }

  ngOnInit(): void {
    console.log("this.router.url "+this.router.url);
    this.authService.getTokens();

    /*this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });*/
  }
}

