import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-update',
  standalone: false,
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css'
})
export class ProfileUpdateComponent {

  profileForm: FormGroup;
  selectedProfilePicture: File | null = null;
  selectedBackgroundImage: File | null = null;
  profilePicturePreview: string | ArrayBuffer | null = null;
  backgroundImagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private UserService:UserService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bio: ['', [Validators.maxLength(500)]],
      location: [''],
      headline: ['', [Validators.maxLength(100)]],
      summary: ['', [Validators.maxLength(2000)]]
    });
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.UserService.getCurrentUser().subscribe({
      next: (response) => {
        this.profileForm.patchValue({
          firstName: response.firstName,
          lastName: response.lastName,
          bio: response.bio,
          location: response.location,
          headline: response.profile?.headline,
          summary: response.profile?.summary
        });
        // Set image previews if available
        if (response.profilePicture) {
          this.profilePicturePreview = response.profilePicture;
        }
        if (response.backGroundImage) {
          this.backgroundImagePreview = response.backGroundImage;
        }
      },
      error: (err) => {
        console.error('Failed to load profile data', err);
        alert('Failed to load profile data');
      }
    });
  }

  onProfilePictureChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedProfilePicture = file;
      const reader = new FileReader();
      reader.onload = () => this.profilePicturePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onBackgroundImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedBackgroundImage = file;
      const reader = new FileReader();
      reader.onload = () => this.backgroundImagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.profileService.updateProfile(
        this.profileForm.value,
        this.selectedProfilePicture || undefined,
        this.selectedBackgroundImage || undefined
      ).subscribe({
        next: () => {
            alert('Profile updated successfully');
        },
        error: (err) => {
          console.error('Failed to update profile', err);
          alert('Failed to update profile');
        }
      });
    }
  }
}
