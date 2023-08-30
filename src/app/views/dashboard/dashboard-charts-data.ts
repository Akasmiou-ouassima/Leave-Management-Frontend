import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {LeavesUserService} from "../services/leaves-user.service";

export interface IChartProps {
  data?: any;
  data1?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  constructor(private leavesUserService:LeavesUserService,private authService:AuthService) {
    this.initMainChart();
  }
  public mainChart: IChartProps = {};
  public mainChart1: IChartProps = {};

  currentYear = new Date().getFullYear();
  initMainChart() {
    console.log("initMainChart .....");
    this.mainChart['elements'] = 12 ;
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];



    this.leavesUserService.getNbCongesByMoisAnnee(this.currentYear).subscribe((nbConges: number[]) => {
      console.log("nbConges => "+JSON.stringify(nbConges));
      //  this.mainChart['Data1'] = nbConges.slice(0, 12);
      //  this.mainChart['Data2'] = nbConges.slice(12);
      for (let i = 0; i <12; i += 1) {
        this.mainChart['Data1'].push(nbConges[i]);
      }
      for (let j = 12; j <24; j+= 1) {
        this.mainChart['Data2'].push(nbConges[j]);
      }
    });

    console.log("initMainChartUser .....");
    this.mainChart1['elements'] = 12 ;
    this.mainChart1['Data1'] = [];
    this.mainChart1['Data2'] = [];

    this.leavesUserService.getNbCongesByMoisUser(this.authService.tokens.id).subscribe((nbCongesUser: number[]) => {
      console.log("nbCongesUser => "+JSON.stringify(nbCongesUser));
      //this.mainChart['Data1'] = nbCongesUser.slice(0, 12);
      for (let i = 0; i <12; i += 1) {
        this.mainChart1['Data1'].push(nbCongesUser[i]);
      }
      for (let j = 12; j <24; j+= 1) {
        this.mainChart1['Data2'].push(nbCongesUser[j]);
      }
      //  this.mainChart['Data2'] = nbCongesUser.slice(12);
      console.log("this.mainChart1['Data1'] => "+JSON.stringify(this.mainChart1['Data1']));
      console.log("this.mainChart1['Data2'] => "+JSON.stringify(this.mainChart1['Data2']));

    });

    //
    let labels: string[] = [];

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
    const datasets1 = [
      {
        data1: this.mainChart1['Data1'],
        label: 'Approved',
        ...colors[0]
      },
      {
        data1: this.mainChart1['Data2'],
        label: 'Unapproved',
        ...colors[1]
      },
    ];
    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          max: 25,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(25 / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart1.type = 'line';
    this.mainChart1.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
    this.mainChart1.data1 = {
      datasets1,
      labels
    };
  }

}
