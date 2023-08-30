import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData) {
  }
  roles!: string | null;
  public mainChart: IChartProps = [];
  public mainChart1: IChartProps = [];
  /* public trafficRadioGroup = new UntypedFormGroup({
     trafficRadio: new UntypedFormControl('Month')
   });*/

  ngOnInit(): void {
    console.log("dashboard ...");
    this.initCharts();
    this.roles = localStorage.getItem("roles");
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
    this.mainChart1 = this.chartsData.mainChart1;
    console.log("this.mainChart  "+JSON.stringify(this.mainChart ));
    console.log("this.mainChart1  "+JSON.stringify(this.mainChart1 ));
  }
  /*
    setTrafficPeriod(value: string): void {
      this.trafficRadioGroup.setValue({ trafficRadio: value });
      this.chartsData.initMainChart(value);
      this.initCharts();
    }*/
}
