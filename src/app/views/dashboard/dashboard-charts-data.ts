import { Injectable } from '@angular/core';
import {LeavesUserService} from "../services/leaves-user.service";

export interface IChartProps {
  data?: any;
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
  constructor(private leavesUserService:LeavesUserService) {
    this.initMainChart();
  }
  public mainChart: IChartProps = {};
  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  initMainChart(period: string = 'Month') {
    this.mainChart['elements'] = period === 'Month' ? 12 : 27;
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];
    /*for (let i = 0; i <= this.mainChart['elements']; i++) {
      this.mainChart['Data1'].push(this.random(50, 200));
      this.mainChart['Data2'].push(this.random(20, 160));
    }*/


    this.leavesUserService.getNbCongesApproved().subscribe((nbCongesApproved: number) => {
      this.mainChart['Data1'] = [];
      for (let i = 0; i <= this.mainChart['elements']; i++) {
        this.mainChart['Data1'].push(nbCongesApproved);
      }
    });

    this.leavesUserService.getNbCongesRefused().subscribe((nbCongesRefused: number) => {
      this.mainChart['Data2'] = [];
      for (let i = 0; i <= this.mainChart['elements']; i++) {
        this.mainChart['Data2'].push(nbCongesRefused);
      }
    });
    let labels: string[] = [];
    if (period === 'Month') {
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
    } else {
      const week = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ];
      labels = week.concat(week, week, week);
    }

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
        label: 'Current',
        ...colors[0]
      },
      {
        data: this.mainChart['Data2'],
        label: 'Previous',
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
          max: 200,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5)
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
    this.mainChart.data = {
      datasets,
      labels
    };
  }

}

