import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user/user.model';
import { Profile } from '../../models/profile/profile.model';
import { Experience } from '../../models/profile/experience.model';
import { Education } from '../../models/profile/education.model';
import { Skill } from '../../models/profile/skill.model';
import { Certification } from '../../models/profile/certification.model';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.css'],
  standalone: false
})
export class ProfileCompletionComponent {
  @Output() profileCompleted = new EventEmitter<Partial<Profile>>();
  
  profileForm: FormGroup;
  currentStep = 1;
  totalSteps = 4;
  profilePicturePreview: string | ArrayBuffer | null = null;
  backgroundImagePreview: string | ArrayBuffer | null = null;
  
  skills: Skill[] = [];
  newSkill = '';
  
  experiences: Experience[] = [];
  educations: Education[] = [];
  certifications: Certification[] = [];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      bio: ['', [Validators.maxLength(500)]],
      location: ['', [Validators.maxLength(100)]],
      headline: ['', [Validators.required, Validators.maxLength(120)]],
      summary: ['', [Validators.maxLength(2000)]],
      profilePicture: [null],
      backgroundImage: [null]
    });
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({ profilePicture: file });
      this.profileForm.get('profilePicture')?.updateValueAndValidity();
      
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onBackgroundImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({ backgroundImage: file });
      this.profileForm.get('backgroundImage')?.updateValueAndValidity();
      
      const reader = new FileReader();
      reader.onload = () => {
        this.backgroundImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addSkill() {
    if (this.newSkill && !this.skills.some(s => s.name === this.newSkill)) {
      this.skills.push({ id: Math.random(), name: this.newSkill });
      this.newSkill = '';
    }
  }

  removeSkill(skill: Skill) {
    this.skills = this.skills.filter(s => s.id !== skill.id);
  }

  addExperience() {
    this.experiences.push({
      id: Math.random(),
      companyName: '',
      title: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  }

  removeExperience(index: number) {
    this.experiences.splice(index, 1);
  }

  addEducation() {
    this.educations.push({
      id: Math.random(),
      schoolName: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: ''
    });
  }

  removeEducation(index: number) {
    this.educations.splice(index, 1);
  }

  addCertification() {
    this.certifications.push({
      id: Math.random(),
      name: '',
      issuer: '',
      issueDate: new Date(),
      expirationDate: undefined
    });
  }

  removeCertification(index: number) {
    this.certifications.splice(index, 1);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const profileData: Partial<Profile> = {
        headline: this.profileForm.value.headline,
        summary: this.profileForm.value.summary,
        skills: this.skills,
        experiences: this.experiences,
        education: this.educations,
        certifications: this.certifications
      };

      const userData: Partial<User> = {
        bio: this.profileForm.value.bio,
        location: this.profileForm.value.location,
        profilePicture: this.profileForm.value.profilePicture,
        backgroundImage: this.profileForm.value.backgroundImage
      };

      // Emit the profile data to the parent component
    }
  }
}