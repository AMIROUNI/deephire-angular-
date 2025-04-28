import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminCompanyService } from '../../services/admin-company.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
  standalone: false,

 
})
export class CompanyProfileComponent {
  errorMessage: string = '';
  logoFile: File | null = null;
  backgroundImageFile: File | null = null;


  formCompany = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    industry: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(
    private adminCompanyService: AdminCompanyService,
    private router: Router
  ) {}

  isInvalidAndTouchedOrDirty(controlName: string): boolean {
    const control = this.formCompany.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  onFileSelected(event: Event, type: 'logo' | 'background'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (type === 'logo') {
        this.logoFile = file;
      } else {
        this.backgroundImageFile = file;
      }
    }
  }

  onSubmitCompany(): void {
    if (this.formCompany.invalid) {
      this.markAllAsTouched();
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const formData = new FormData();
    formData.append('profileData', JSON.stringify(this.formCompany.value));

    if (this.logoFile) {
      formData.append('profilePicture', this.logoFile);
    }

    if (this.backgroundImageFile) {
      formData.append('backGroundImage', this.backgroundImageFile);
    }

    this.adminCompanyService.completeProfileCompany(formData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error completing company profile. Please try again.';
      }
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.formCompany.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}