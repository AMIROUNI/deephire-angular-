import { Component } from '@angular/core';

@Component({
  selector: 'app-top-companies',
  standalone: false,
  templateUrl: './top-companies.component.html',
  styleUrl: './top-companies.component.css'
})
export class TopCompaniesComponent {
  companies = [
    { name: 'TechCorp', logo: 'assets/images/innovatex.png', jobsPosted: 15 },
    { name: 'InnovateX', logo: 'assets/innovatex.png', jobsPosted: 12 }
  ];
}

