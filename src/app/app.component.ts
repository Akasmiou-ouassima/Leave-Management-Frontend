import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {AuthService} from "./views/services/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {


  constructor(
    private router: Router,private authService : AuthService,private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    console.log("this.router.url "+this.router.url);
    /*  if (!(this.router.url === '/reset-password') ){
        this.authService.getTokens();
      }*/
    this.authService.getTokens();
    //
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}

