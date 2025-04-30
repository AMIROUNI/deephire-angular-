import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-application-status',
  standalone: false,
  templateUrl: './application-status.component.html',
  styleUrl: './application-status.component.css'
})
export class ApplicationStatusComponent {
  public chartOptions: Partial<any> = {
    series: [50, 30, 20],
    chart: {
      type: 'pie',
      height: 350,
      background: '#1e1e2f'
    },
    labels: ['Pending', 'Approved', 'Rejected'],
    colors: ['#ffd166', '#06d6a0', '#ef476f'],
    title: {
      text: 'Application Status',
      style: { color: '#ffffff' }
    },
    theme: { mode: 'dark' },
    legend: {
      labels: { colors: '#ffffff' }
    }
  };
}
