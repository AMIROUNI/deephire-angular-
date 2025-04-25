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
    this.companyForm = this.fb.group({
      // User fields
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: [''],
      backgroundImage: [''],
      bio: [''],
      location: [''],
      
      // RHCompany specific fields
      company: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required]
      })
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
          firstName: company.firstName,
          lastName: company.lastName,
          email: company.email,
          location: company.location || '',
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error loading company data';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
     
      this.isLoading = true;
      const updatedCompany: RHCompany = {
        id: this.companyId,
        ...this.companyForm.value
      };
      console.log("updatedCompany", updatedCompany);
      this.rhCompanyService.updateRhCompany(this.companyId, updatedCompany).subscribe({
        next: () => {
          alert('Company updated successfully');
       
          // Optionally navigate to another page or refresh the list
        //  this.router.navigate(['/display-recruiter']);
        },
        error: (err) => {
          this.error = 'Error updating company';
          this.isLoading = false;
          console.error(err);
        }
      });
    
  }

  onCancel(): void {
    this.router.navigate(['/display-recruiter']);
  }
}