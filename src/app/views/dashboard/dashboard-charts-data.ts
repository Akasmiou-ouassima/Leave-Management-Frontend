import {Injectable, OnInit} from '@angular/core';
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
export class DashboardChartsData{
  constructor(private leavesUserService:LeavesUserService,private authService:AuthService) {
  }
  public mainChart: IChartProps = {};



  initMainChart(): IChartProps{

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

    const options1 = {
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
          max: 1,
          ticks: {
            maxTicksLimit: 1,
            stepSize: 1

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
    if(this.authService.isAdmin()){
      console.log("options admin");
      this.mainChart.options = options;
    }else{
      console.log("options user");
      this.mainChart.options = options1;
    }

    return this.mainChart;
  };
}
