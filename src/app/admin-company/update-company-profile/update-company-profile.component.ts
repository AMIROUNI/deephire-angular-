import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-company-profile',
  templateUrl: './update-company-profile.component.html',
  styleUrls: ['./update-company-profile.component.css'],
  standalone:false
})
export class UpdateCompanyProfileComponent {
  profileForm: FormGroup;
  logoPreview: string | ArrayBuffer | null = null;
  backgroundPreview: string | ArrayBuffer | null = null;
  selectedLogo?: File ;
  selectedBackground?: File;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.profileForm = this.fb.group({
      name: [''],
      industry: [''],
      location: [''],
      description: ['']
    });
  }

  fetchProfile() {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get<any>('http://localhost:8080/api/company/me', { headers }).subscribe(data => {
      this.profileForm.patchValue({
        name: data.name,
        industry: data.industry,
        location: data.location,
        description: data.description
      });

      if (data.logo) {
        this.logoPreview = 'data:image/png;base64,' + data.logo;
      }

      if (data.backgroundImage) {
        this.backgroundPreview = 'data:image/png;base64,' + data.backgroundImage;
      }
    });
  }

  onLogoChange(event: any) {
    this.selectedLogo = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.logoPreview = reader.result;
    if (this.selectedLogo) {
      reader.readAsDataURL(this.selectedLogo);
    }
  }

  onBackgroundChange(event: any) {
    this.selectedBackground = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.backgroundPreview = reader.result;
    if (this.selectedBackground) {
      reader.readAsDataURL(this.selectedBackground);
    }
  }

  updateProfile() {
    const companyData = this.profileForm.value;
    const formData = new FormData();
    formData.append('profileData', JSON.stringify(companyData));
    if (this.selectedLogo) {
      formData.append('profilePicture', this.selectedLogo);
    }
    if (this.selectedBackground) {
      formData.append('backGroundImage', this.selectedBackground);
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    this.http.put('http://localhost:8080/api/company/update-profile-company', formData, { headers }).subscribe({
      next: res => alert('Profile updated successfully!'),
      error: err => alert('Error updating profile.')
    });
  }
}
