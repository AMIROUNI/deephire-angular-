import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexLegend,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';

type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-post-management',
  standalone: false,
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.css']
})
export class PostManagementComponent implements OnInit {
  searchText = '';
  posts = [
    { id: 1, author: 'John Doe', content: 'Lorem ipsum dolor sit amet...', date: '2025-04-14', active: true, reported: false },
    { id: 2, author: 'Jane Smith', content: 'Consectetur adipiscing elit...', date: '2025-04-13', active: false, reported: true },
    { id: 3, author: 'Alice Johnson', content: 'Sed do eiusmod tempor incididunt...', date: '2025-04-12', active: true, reported: false },
  ];

  totalPosts = this.posts.length;
  activePosts = this.posts.filter(post => post.active).length;
  reportedPosts = this.posts.filter(post => post.reported).length;

  public postLineChart: LineChartOptions = {
    series: [],
    chart: {
      height: 300,
      type: 'line'
    },
    xaxis: {
      categories: []
    },
    title: {
      text: 'Posts créés par jour'
    }
  };

  public postStatusDonutChart: DonutChartOptions = {
    series: [],
    chart: {
      type: 'donut',
      height: 300
    },
    labels: ['Actifs', 'Désactivés', 'Signalés'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    legend: {
      position: 'right'
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.updateStatistics();
  }

  generatePostsPerDayChart(): void {
    const postsPerDay: { [key: string]: number } = {};
    this.posts.forEach(post => {
      const postDate = new Date(post.date).toLocaleDateString();
      if (!postsPerDay[postDate]) {
        postsPerDay[postDate] = 0;
      }
      postsPerDay[postDate]++;
    });

    this.postLineChart.series = [{
      name: 'Posts créés',
      data: Object.values(postsPerDay)
    }];

    this.postLineChart.xaxis.categories = Object.keys(postsPerDay);
  }

  generateDonutChart(): void {
    const activeCount = this.posts.filter(post => post.active).length;
    const inactiveCount = this.posts.filter(post => !post.active && !post.reported).length;
    const reportedCount = this.posts.filter(post => post.reported).length;

    this.postStatusDonutChart.series = [activeCount, inactiveCount, reportedCount];
  }

  togglePost(post: any): void {
    post.active = !post.active;
    this.updateStatistics();
  }

  deletePost(post: any): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      this.posts = this.posts.filter(p => p.id !== post.id);
      this.updateStatistics();
    }
  }

  updateStatistics(): void {
    this.totalPosts = this.posts.length;
    this.activePosts = this.posts.filter(post => post.active).length;
    this.reportedPosts = this.posts.filter(post => post.reported).length;
    this.generatePostsPerDayChart();
    this.generateDonutChart();
  }

  filteredPosts() {
    return this.posts.filter(post =>
      post.content.toLowerCase().includes(this.searchText.toLowerCase()) ||
      post.author.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
