import { StatCardsComponent } from './components/stat-cards/stat-cards.component';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke
} from 'ng-apexcharts';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CourbeutilisateursconnecteComponent } from './components/courbeutilisateursconnecte/courbeutilisateursconnecte.component';
import { LatestusersComponent } from './components/latestusers/latestusers.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatCardsComponent,
    CourbeutilisateursconnecteComponent,
    LatestusersComponent,
    
  ]
})
export class DashboardModule { }
