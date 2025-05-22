import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminCompanyService } from '../../services/admin-company.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
  standalone: false
})
export class CompanyProfileComponent {
  errorMessage: string = '';
  logoFile: File | null = null;
  backgroundImageFile: File | null = null;
  logoPreview: string | ArrayBuffer | null = null;
  backgroundPreview: string | ArrayBuffer | null = null;


  //---------------------------------------------------
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;

  formCompany = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    industry: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(
    private adminCompanyService: AdminCompanyService,private userService: UserService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('Current user:', user);
        if (user.firstLogin === false) {
          this.router.navigate(['/dashboard-admin-company']);
        }
      
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        // Facultatif: tu peux décider de rediriger ailleurs si erreur (ex: page login)
      }
    });
  }

  isInvalidAndTouchedOrDirty(controlName: string): boolean {
    const control = this.formCompany.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  onFileSelected(event: Event, type: 'logo' | 'background'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.match('image.*')) {
        this.errorMessage = 'Only image files are allowed';
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'File size should not exceed 5MB';
        return;
      }

      // Set the file and create preview
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'logo') {
          this.logoFile = file;
          this.logoPreview = reader.result;
        } else {
          this.backgroundImageFile = file;
          this.backgroundPreview = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
onSubmitCompany(): void {
  if (this.formCompany.invalid) {
    this.markAllAsTouched();
    this.errorMessage = 'Please fill all required fields correctly.';
    return;
  }

  const formData = new FormData();

  // Create the company data object
  const companyData = {
    name: this.formCompany.get('name')?.value,
    industry: this.formCompany.get('industry')?.value,
    location: this.formCompany.get('location')?.value,
    description: this.formCompany.get('description')?.value
  };

  // Append as JSON string
  formData.append('profileData', JSON.stringify(companyData));

  // Append files if they exist
  if (this.logoFile) {
    formData.append('profilePicture', this.logoFile);
  }

  if (this.backgroundImageFile) {
    formData.append('backGroundImage', this.backgroundImageFile);
  }

  this.adminCompanyService.completeProfileCompany(formData).subscribe({
    next: () => {this.showSuccessPopup()
      this.router.navigate(['/feed']);
    },
    error: (err) => {
      console.error(err);
      if (err.status === 401) {
        this.errorMessage = 'Session expired. Please login again.';
      } else {
        this.errorMessage = 'Error completing company profile. Please try again.';
      }
      this.showErrorPopup("Error completing company profile")
    }
  });
}

  private markAllAsTouched(): void {
    Object.values(this.formCompany.controls).forEach(control => {
      control.markAsTouched();
    });
  }


  showSuccessPopup() {
    this.popupTitle = 'Company Created!';
    this.popupMessage = 'Your Company profile has been successfully created.';
    this.popupIsSuccess = true;
    this.popupRedirectPath = '/';
    this.showCancelButton = false;
    this.showPopup = true;
  }

  showErrorPopup(errorMessage: string) {
    this.popupTitle = 'Company Creating Failed';
    this.popupMessage = errorMessage;
    this.popupIsSuccess = false;
    this.popupRedirectPath = null;
    this.showCancelButton = true;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}