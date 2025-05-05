import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';

interface ApplicationStatus {
  state: string;
  count: number;
}

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css'],
  standalone: false
})
export class ApplicationStatusComponent implements OnInit {
  public chartOptions: any;
  private applicationData: ApplicationStatus[] = [];

  constructor(private dashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getApplicationStatusData().subscribe((data: ApplicationStatus[]) => {
      this.applicationData = data;
      const labels = data.map(item => this.formatLabel(item.state));
      const values = data.map(item => item.count);
      const total = values.reduce((sum, value) => sum + value, 0);

      this.chartOptions = {
        series: values,
        chart: {
          type: 'donut',
          height: 350,
          background: 'transparent',
          animations: {
            enabled: true,
            easing: 'easeout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            }
          },
          toolbar: {
            show: false
          }
        },
        labels: labels,
        colors: ['#4e79a7', '#59a14f', '#f28e2b', '#e15759', '#76b7b2', '#edc948'],
        title: {
          text: '',
          align: 'center',
          style: {
            color: '#2c3e50',
            fontSize: '16px',
            fontWeight: '600'
          }
        },
        dataLabels: {
          enabled: false
        },
        theme: { 
          mode: 'light',
          palette: 'palette1'
        },
        legend: {
          show: false,
          position: 'bottom',
          horizontalAlign: 'center',
          labels: {
            colors: '#7f8c8d',
            useSeriesColors: false
          },
          markers: {
            width: 12,
            height: 12,
            radius: 6
          },
          itemMargin: {
            horizontal: 10,
            vertical: 5
          }
        },
        responsive: [{
          breakpoint: 768,
          options: {
            chart: {
              height: 300
            }
          }
        }],
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total Applications',
                  color: '#34495e',
                  fontSize: '14px',
                  fontWeight: '600',
                  formatter: () => total.toString()
                },
                value: {
                  color: '#2c3e50',
                  fontSize: '24px',
                  fontWeight: '700'
                }
              }
            }
          }
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: (value: number) => {
              const percentage = ((value / total) * 100).toFixed(1);
              return `${value} applications (${percentage}%)`;
            }
          },
          style: {
            fontSize: '14px'
          }
        }
      };
    });
  }

  private formatLabel(state: string): string {
    return state.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }

  getLegendItems(): any[] {
    if (!this.applicationData || this.applicationData.length === 0) return [];
    
    const total = this.applicationData.reduce((sum, item) => sum + item.count, 0);
    return this.applicationData.map((item, index) => {
      const percentage = ((item.count / total) * 100).toFixed(1);
      return {
        label: this.formatLabel(item.state),
        value: item.count,
        percentage: percentage,
        color: this.chartOptions?.colors[index] || '#4e79a7'
      };
    });
  }
}