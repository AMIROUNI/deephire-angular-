import { Component } from '@angular/core';

@Component({
  selector: 'app-kpi-cards',
  standalone: false,
  templateUrl: './kpi-cards.component.html',
  styleUrl: './kpi-cards.component.css'
})
export class KpiCardsComponent {

  

  kpis = [
    { title: 'Total Users', value: 125 },
    { title: 'Active Users', value: 85 },
    { title: 'Total Companies', value: 40 },
    { title: 'Jobs Posted', value: 75 }
  ];
}
