import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { NgxApexchartsModule } from 'ngx-apexcharts';

@Component({
  selector: 'app-user-growth-chart',
  standalone: false,
  templateUrl: './user-growth-chart.component.html',
  styleUrl: './user-growth-chart.component.css',
})
export class UserGrowthChartComponent {
  public chartOptions: Partial<any> = {
    series: [
      {
        name: 'New Users',
        data: [5, 10, 8, 15, 20, 18]
      }
    ],
    chart: {
      type: 'line',
      height: 350,
      background: '#1e1e2f'
    },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#ffffff' } }
    },
    yaxis: {
      labels: { style: { colors: '#ffffff' } }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#4361ee'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    colors: ['#4361ee'],
    title: {
      text: 'User Growth',
      style: { color: '#ffffff' }
    },
    theme: { mode: 'dark' }
  };
}
