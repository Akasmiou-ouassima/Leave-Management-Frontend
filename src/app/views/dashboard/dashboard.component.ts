import { Component, OnInit } from '@angular/core';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {AuthService} from "../services/auth.service";
import {LeavesUserService} from "../services/leaves-user.service";



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData, private authService: AuthService,
              private leaveUser: LeavesUserService,
              private auth: AuthService) {
  }

  admin: boolean = false;
  public mainChart: IChartProps = [];
  currentYear = new Date().getFullYear();

  /* public trafficRadioGroup = new UntypedFormGroup({
     trafficRadio: new UntypedFormControl('Month')
   });*/

  ngOnInit(): void {
    console.log("dashboard ...");
    this.initCharts();
    this.admin = this.authService.isAdmin();
  }

  initCharts() {
    this.mainChart=[];
    let labels: string[] = [];
    this.mainChart=this.chartsData.initMainChart();
    labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const colors = [
      {
        backgroundColor: 'transparent',
        borderColor: '#109CF1',
        pointHoverBackgroundColor: '#fff',
        fill: true
      },
      {
        backgroundColor: 'transparent',
        borderColor: '#DC3545',
        pointHoverBackgroundColor: '#fff',
      },

    ];
    console.log("avant : "+JSON.stringify(this.mainChart));
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];
    this.mainChart['elements'] = 12 ;
    if(this.authService.isAdmin()){
      console.log("initMainChart ...Admin..");
      this.leaveUser.getNbCongesByMoisAnnee(this.currentYear).subscribe((nbConges: number[]) => {
        console.log("nbConges => "+JSON.stringify(nbConges));
        //  this.mainChart['Data1'] = nbConges.slice(0, 12);
        //  this.mainChart['Data2'] = nbConges.slice(12);
        for (let i = 0; i <12; i += 1) {
          this.mainChart['Data1'].push(nbConges[i]);
        }
        for (let j = 12; j <24; j+= 1) {
          this.mainChart['Data2'].push(nbConges[j]);
        }

        console.log("this.mainChart['Data1'] => "+JSON.stringify(this.mainChart['Data1']));
        console.log("this.mainChart['Data2'] => "+JSON.stringify(this.mainChart['Data2']));

        //
        const datasets = [
          {
            data: this.mainChart['Data1'],
            label: 'Approved',
            ...colors[0]
          },
          {
            data: this.mainChart['Data2'],
            label: 'Unapproved',
            ...colors[1]
          },
        ];
        this.mainChart.data = {
          datasets,
          labels
        };
      });

    }else{

      console.log("initMainChart  User .....");
      this.leaveUser.getNbCongesByMoisUser(this.authService.tokens.id).subscribe((nbCongesUser: number[]) => {
        console.log("nbCongesUser => "+JSON.stringify(nbCongesUser));
        //this.mainChart['Data1'] = nbCongesUser.slice(0, 12);
        for (let i = 0; i <12; i += 1) {
          this.mainChart['Data1'].push(nbCongesUser[i]);
        }
        for (let j = 12; j <24; j+= 1) {
          this.mainChart['Data2'].push(nbCongesUser[j]);
        }
        //  this.mainChart['Data2'] = nbCongesUser.slice(12);
        console.log("this.mainChart1['Data1'] => "+JSON.stringify(this.mainChart['Data1']));
        console.log("this.mainChart1['Data2'] => "+JSON.stringify(this.mainChart['Data2']));
        //
        const datasets = [
          {
            data: this.mainChart['Data1'],
            label: 'Approved',
            ...colors[0]
          },
          {
            data: this.mainChart['Data2'],
            label: 'Unapproved',
            ...colors[1]
          },
        ];
        this.mainChart.data = {
          datasets,
          labels
        };
        console.log("apres : "+JSON.stringify(this.mainChart));
      });

    }
  }
}
