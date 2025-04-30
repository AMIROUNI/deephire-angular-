import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExperienceService } from '../../services/experience.service';
import { Experience } from '../../models';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css'],
  standalone: false
})
export class ExperienceFormComponent {
  @Output() cancel = new EventEmitter<void>();

  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;
  errorMessage!: string;

  constructor(private experienceService: ExperienceService) {}

  experienceForm = new FormGroup({
    companyName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    startDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    endDate: new FormControl('', { nonNullable: false }),
    description: new FormControl('', { nonNullable: false }),
  });

  isInvalidAndTouchedOrDirty(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.experienceForm.valid) {
      const formValue = this.experienceForm.value;

      const experience: Experience = {
        companyName: formValue.companyName!,
        title: formValue.title!,
        startDate: formValue.startDate!,
        endDate: formValue.endDate ?? undefined,
        description: formValue.description ?? ''
      };

      this.experienceService.addExperience(experience).subscribe({
        next: () => {
          this.showSuccessPopup();
          window.location.reload();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.status === 401
            ? 'Session expired. Please login again.'
            : 'Error adding experience. Please try again.';
          this.showErrorPopup(this.errorMessage);
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  showSuccessPopup() {
    this.popupTitle = 'Experience Created!';
    this.popupMessage = 'Experience successfully added to your profile!';
    this.popupIsSuccess = true;
    this.showCancelButton = false;
    this.showPopup = true;
  }

  showErrorPopup(errorMessage: string) {
    this.popupTitle = 'Experience Creation Failed';
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
