import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RhCompanyService } from '../../services/rh-company.service';
import { RHCompany } from '../../models';

@Component({
  selector: 'app-edit-rh-company',
  templateUrl: './edit-rh-company.component.html',
  styleUrls: ['./edit-rh-company.component.css'],
  standalone: false  
})
export class EditRhCompanyComponent implements OnInit {
  companyForm: FormGroup;
  companyId!: number;
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rhCompanyService: RhCompanyService
  ) {
    // ✅ NOUVEAU FORMULAIRE : seulement les champs nécessaires
    this.companyForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.companyId = +this.route.snapshot.paramMap.get('id')!;
    this.loadCompanyData();
  }

  loadCompanyData(): void {
    this.isLoading = true;
    this.rhCompanyService.getRhCompanyById(this.companyId).subscribe({
      next: (company) => {
        this.companyForm.patchValue({
          username: company.username,
          email: company.email,
          password: '', // 🔥 Optionnel : demander à l'utilisateur de ressaisir un mot de passe
          firstName: company.firstName,
          lastName: company.lastName
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error loading RH company data';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.companyForm.invalid) {
      return;
    }

    this.isLoading = true;

    const updatedRHCompany: RHCompany = {
      id: this.companyId,
      ...this.companyForm.value
    };

    console.log("updatedRHCompany", updatedRHCompany);

    this.rhCompanyService.updateRhCompany(this.companyId, updatedRHCompany).subscribe({
      next: () => {
        alert('RH Company updated successfully');
        this.router.navigate(['/recruiter-management']);
      },
      error: (err) => {
        this.error = 'Error updating RH company';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/recruiter-management']);
  }
}
