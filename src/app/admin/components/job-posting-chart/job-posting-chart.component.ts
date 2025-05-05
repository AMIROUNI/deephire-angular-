import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';

@Component({
  selector: 'app-job-posting-chart',
  standalone: false,
  templateUrl: './job-posting-chart.component.html',
  styleUrl: './job-posting-chart.component.css'
})
export class JobPostingChartComponent {
   jobPostingsPerMonth: number[] = [];
    errorMessage: string | null = null;
    isLoading = true;
    currentMonthIndex = new Date().getMonth();
  
    public chartOptions: any = {
      series: [
        {
          name: 'Job Postings',
          data: []
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        background: '#ffffff',
        foreColor: '#2d3748',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: false,
          columnWidth: '65%',
          distributed: false,
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'],
      dataLabels: {
        enabled: true,
        formatter: function(val: number) {
          return val > 0 ? val : '';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#4b5563'],
          fontFamily: 'Inter, sans-serif'
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            colors: '#4b5563',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500
          }
        },
        axisBorder: {
          show: true,
          color: '#e5e7eb'
        },
        axisTicks: {
          show: true,
          color: '#e5e7eb'
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        title: {
          text: 'Number of Job Postings',
          style: {
            color: '#4b5563',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }
        },
        labels: {
          style: {
            colors: '#4b5563',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif'
          }
        },
        min: 0,
        forceNiceScale: true,
        axisBorder: {
          show: true,
          color: '#e5e7eb'
        },
        axisTicks: {
          show: true,
          color: '#e5e7eb'
        }
      },
      fill: {
        opacity: 1,
        type: 'solid'
      },
      title: {
        text: 'Monthly Job Postings Trend',
        align: 'left',
        margin: 20,
        style: {
          color: '#111827',
          fontSize: '18px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600
        }
      },
      theme: {
        mode: 'light'
      },
      tooltip: {
        theme: 'light',
        style: {
          fontFamily: 'Inter, sans-serif'
        },
        y: {
          formatter: function(val: number) {
            return val + (val === 1 ? ' posting' : ' postings');
          }
        }
      },
      grid: {
        borderColor: '#f3f4f6',
        strokeDashArray: 4,
        padding: {
          top: 20,
          right: 20,
          bottom: 0,
          left: 20
        },
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '75%'
              }
            },
            chart: {
              height: 300
            },
            dataLabels: {
              enabled: false
            }
          }
        }
      ]
    };
  
    constructor(private adminDashboardService: AdminDashboardService) {}
  
    ngOnInit() {
      this.loadData();
    }
  
    loadData() {
      this.isLoading = true;
      this.errorMessage = null;
      
      this.adminDashboardService.getMonthlyJobPostings().subscribe({
        next: (data: number[]) => {
          this.jobPostingsPerMonth = data;
          this.chartOptions.series[0].data = data;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error fetching job postings per month', error);
          this.errorMessage = 'Unable to load job postings data. Please try again later.';
          this.isLoading = false;
        }
      });
    }
  
    retryLoadData() {
      this.loadData();
    }
  
    getTotalPostings(): number {
      return this.jobPostingsPerMonth.reduce((a, b) => a + b, 0);
    }
  
    getCurrentMonthPostings(): number {
      return this.jobPostingsPerMonth[this.currentMonthIndex] || 0;
    }
  
    getGrowthRate(): number {
      if (this.jobPostingsPerMonth.length < 2 || this.currentMonthIndex === 0) return 0;
      
      const current = this.jobPostingsPerMonth[this.currentMonthIndex];
      const previous = this.jobPostingsPerMonth[this.currentMonthIndex - 1];
      
      if (previous === 0) return 100;
      
      return Math.round(((current - previous) / previous) * 100);
    }
}
