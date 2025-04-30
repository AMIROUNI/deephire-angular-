import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-job-posting-chart',
  standalone: false,
  templateUrl: './job-posting-chart.component.html',
  styleUrl: './job-posting-chart.component.css'
})
export class JobPostingChartComponent {
  public chartOptions: Partial<any> = {
    series: [
      {
        name: 'Job Postings',
        data: [10, 20, 15, 25, 30, 28]
      }
    ],
    chart: {
      type: 'bar',
      height: 350,
      background: '#1e1e2f'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#ffffff' } }
    },
    yaxis: {
      labels: { style: { colors: '#ffffff' } }
    },
    fill: { colors: ['#3f37c9'] },
    title: {
      text: 'Job Postings',
      style: { color: '#ffffff' }
    },
    theme: { mode: 'dark' }
  };
}
