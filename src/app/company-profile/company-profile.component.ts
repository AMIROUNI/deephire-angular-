import { Component } from '@angular/core';
import { Company, sampleCompanies } from '../models/company/company.model';

@Component({
  selector: 'app-company-profile',
  standalone: false,
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent {

  selectedCompany?: Company;

  ngOnInit(): void {
    // Pick first company for demo
    this.selectedCompany = sampleCompanies[0];
  }
}
