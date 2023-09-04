import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {AuthService} from "../services/auth.service";



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData,private authService:AuthService) {
  }
  admin : boolean=false;
  public mainChart: IChartProps = [];

  /* public trafficRadioGroup = new UntypedFormGroup({
     trafficRadio: new UntypedFormControl('Month')
   });*/

  ngOnInit(): void {
    console.log("dashboard ...");
    this.initCharts();
    this.admin=this.authService.isAdmin();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
    console.log("this.mainChart  "+JSON.stringify(this.mainChart ));
  }
  /*
    setTrafficPeriod(value: string): void {
      this.trafficRadioGroup.setValue({ trafficRadio: value });
      this.chartsData.initMainChart(value);
      this.initCharts();
    }*/
}
