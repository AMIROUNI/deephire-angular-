import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';

// Define interfaces for better type checking
export interface Skill {
  name: string;
  level?: number;
}

export interface Experience {
  title: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate: string;
}

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.css'],
  standalone:false
})
export class ProfileCompletionComponent implements OnInit {
  @Output() profileCompleted = new EventEmitter<any>();

  profileForm!: FormGroup;
  currentStep = 1;
  totalSteps = 4;

  // Image preview properties
  profilePicturePreview: string | ArrayBuffer | null = null;
  backgroundImagePreview: string | ArrayBuffer | null = null;

  // Dynamic data collections
  newSkill = '';
  skills: Skill[] = [];
  experiences: Experience[] = [];
  educations: Education[] = [];
  certifications: Certification[] = [];

  // UI state
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    //this.loadExistingProfile();
  }

  private initializeForm(): void {
    this.profileForm = this.fb.group({
      headline: ['', [Validators.required, Validators.maxLength(120)]],
      bio: ['', [Validators.maxLength(500)]],
      location: ['', [Validators.maxLength(100)]],
      summary: ['', [Validators.maxLength(2000)]],
      profilePicture: [null],
      backgroundImage: [null]
    });
  }

  loadExistingProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        if (profile) {
          this.populateForm(profile);
        }
      },
      error: (err) => {
        console.error('Error loading profile', err);
      }
    });
  }

  populateForm(profile: any): void {
    if (!profile) return;

    this.profileForm.patchValue({
      bio: profile.bio || '',
      location: profile.location || '',
      headline: profile.headline || '',
      summary: profile.summary || ''
    });

    // Populate dynamic collections if they exist
    this.skills = profile.skills || [];
    this.experiences = profile.experiences || [];
    this.educations = profile.education || [];
    this.certifications = profile.certifications || [];
  }

  // Navigation methods
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      // Validate current step before proceeding
      if (this.currentStep === 1 && this.profileForm.get('headline')?.invalid) {
        this.profileForm.get('headline')?.markAsTouched();
        return;
      }

      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Image handling methods
  onProfilePictureChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        this.errorMessage = 'Only image files are allowed';
        return;
      }

      // Validate file size (e.g., 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'File size should not exceed 5MB';
        return;
      }

      this.profileForm.patchValue({ profilePicture: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onBackgroundImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({ backgroundImage: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.backgroundImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Skills management
  addSkill(): void {
    if (this.newSkill.trim()) {
      const exists = this.skills.some(s =>
        s.name.toLowerCase() === this.newSkill.toLowerCase());

      if (!exists) {
        this.skills.push({ name: this.newSkill.trim() });
        this.newSkill = '';
      }
    }
  }

  removeSkill(skill: Skill): void {
    this.skills = this.skills.filter(s => s.name !== skill.name);
  }

  // Experience management
  addExperience(): void {
    this.experiences.push({
      title: '',
      companyName: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  }

  removeExperience(index: number): void {
    this.experiences.splice(index, 1);
  }

  // Education management
  addEducation(): void {
    this.educations.push({
      schoolName: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: ''
    });
  }

  removeEducation(index: number): void {
    this.educations.splice(index, 1);
  }

  // Certification management
  addCertification(): void {
    this.certifications.push({
      name: '',
      issuer: '',
      issueDate: '',
      expirationDate: ''
    });
  }

  removeCertification(index: number): void {
    this.certifications.splice(index, 1);
  }

  // Form submission
  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const profileData = {
      ...this.profileForm.value,
      skills: this.skills,
      experiences: this.experiences,
      education: this.educations,
      certifications: this.certifications
    };

    // Get the files from the form
    const profilePicture = this.profileForm.get('profilePicture')?.value;
    const backgroundImage = this.profileForm.get('backgroundImage')?.value;

    // Remove the files from the profileData object as we'll send them separately
    delete profileData.profilePicture;
    delete profileData.backgroundImage;

    this.profileService.completeProfileWithImages(
      profileData,
      profilePicture,
      backgroundImage
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.profileCompleted.emit(response);
        //add skip method to update first login to false *******************************************************************
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to save profile. Please try again.';
        console.error('Error completing profile', err);
      }
    });
  }

  // Skip profile completion
  skipProfile(): void {
    this.isLoading = true;
    this.profileService.skipProfileCompletion().subscribe({
      next: () => {
        this.isLoading = false;
        this.profileCompleted.emit();
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to skip profile completion';
        console.error('Error skipping profile completion', err);
      }
    });
  }
}
