import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {
    ButtonModule,
    CardModule,
    DropdownModule,
    GridModule,
    ProgressModule,
    SharedModule, TextColorDirective,
    WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';


import { WidgetsRoutingModule } from './widgets-routing.module';
import {WidgetsDropdownComponent} from "./widgets-dropdown/widgets-dropdown.component";


@NgModule({
  declarations: [
    WidgetsDropdownComponent,
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    ProgressModule,
    ChartjsModule,
    TextColorDirective,
    NgOptimizedImage
  ],
  exports: [
    WidgetsDropdownComponent
  ]
})
export class WidgetsModule {
}
