import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public chartSeries: ApexAxisChartSeries = [
    {
      name: 'Inscriptions',
      data: [5, 12, 18, 24, 30, 45, 55]
    }
  ];

  public chartDetails: ApexChart = {
    type: 'line',
    height: 350,
    zoom: {
      enabled: false
    }
  };

  public chartTitle: ApexTitleSubtitle = {
    text: 'Inscriptions mensuelles',
    align: 'left'
  };

  public chartXAxis: ApexXAxis = {
    categories: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil']
  };

  public chartStroke: ApexStroke = {
    curve: 'smooth'
  };

  // Ajoute ça dans DashboardComponent

// Série pour la courbe des connexions par période
public connectedUsersSeries: ApexAxisChartSeries = [
  {
    name: 'Utilisateurs connectés',
    data: [12, 25, 18, 8] // Exemple : matin, après-midi, soir, nuit
  }
];

// Options du graphique
public connectedUsersChart: ApexChart = {
  type: 'bar',
  height: 350
};

// Titre du graphique
public connectedUsersTitle: ApexTitleSubtitle = {
  text: 'Utilisateurs connectés par période',
  align: 'left'
};

// X Axis (périodes de la journée)
public connectedUsersXAxis: ApexXAxis = {
  categories: ['Matin', 'Après-midi', 'Soir', 'Nuit']
};

  
}
