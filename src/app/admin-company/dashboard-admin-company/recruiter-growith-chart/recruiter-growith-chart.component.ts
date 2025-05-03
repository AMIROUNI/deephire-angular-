import { Component, OnInit } from '@angular/core';
import { AdminCompanyDashboardService } from '../../../services/admin-company-dashboard.service';

@Component({
  selector: 'app-recruiter-growith-chart',
  standalone: false,
  templateUrl: './recruiter-growith-chart.component.html',
  styleUrl: './recruiter-growith-chart.component.css'
})
export class RecruiterGrowithChartComponent implements OnInit {
  public chartOptions: any = {
    series: [
      {
        name: 'New Connections',
        data: [] // Will be populated from API
      }
    ],
    chart: {
      type: 'line',
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
        },
        autoSelected: 'zoom' 
      }
    },
    stroke: {
      width: 4,
      curve: 'smooth',
      colors: ['#4a6cf7']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { 
        style: { 
          colors: '#4a5568',
          fontFamily: 'Inter, sans-serif'
        } 
      },
      axisBorder: {
        show: true,
        color: '#e2e8f0'
      },
      axisTicks: {
        color: '#e2e8f0'
      }
    },
    yaxis: {
      title: {
        text: 'Network Growth',
        style: { 
          color: '#4a5568',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600
        }
      },
      labels: { 
        style: { 
          colors: '#4a5568',
          fontFamily: 'Inter, sans-serif'
        } 
      },
      min: 0,
      forceNiceScale: true
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        gradientToColors: ['#a855f7'],
        shadeIntensity: 0.5,
        type: 'vertical',
        opacityFrom: 0.8,
        opacityTo: 0.2,
        stops: [0, 100]
      }
    },
    colors: ['#4a6cf7'],
    markers: {
      size: 6,
      colors: ['#ffffff'],
      strokeColors: '#4a6cf7',
      strokeWidth: 2,
      hover: {
        size: 8
      }
    },
    title: {
      text: 'Professional Network Expansion',
      align: 'left',
      style: {
        color: '#1a1a1a',
        fontSize: '20px',
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
      marker: {
        show: true
      }
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
      padding: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 20
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  constructor(private adminCompanyDashboardService: AdminCompanyDashboardService) {}

  ngOnInit() {
    this.adminCompanyDashboardService.getRecruitersPerMonth().subscribe(
      (data: number[]) => {
        this.chartOptions.series[0].data = data;
      },
      (error: any) => {
        console.error('Error fetching recruiter growth data', error);
      }
    );
  }
}