import {Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  currentNavItem!: string;

  constructor() {}

  setCurrentNavItem(item: string) {
    this.currentNavItem = item;
  }

}

