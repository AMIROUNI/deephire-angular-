import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EducationService } from '../../services/education.service';
import { Education } from '../../models';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css'],
  standalone: false
})
export class EducationFormComponent {
  @Output() cancel = new EventEmitter<void>();

  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;
  errorMessage!: string;

  constructor(private educationService: EducationService) {}

  educationForm = new FormGroup({
    schoolName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    degree: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    fieldOfStudy: new FormControl('', { nonNullable: false }),
    startDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    endDate: new FormControl('', { nonNullable: false }),
  });

  isInvalidAndTouchedOrDirty(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.educationForm.valid) {
      const educationToSend: Education = {
        schoolName: this.educationForm.value.schoolName!,
        degree: this.educationForm.value.degree!,
        fieldOfStudy: this.educationForm.value.fieldOfStudy ?? '',
        startDate: this.educationForm.value.startDate!,
        endDate: this.educationForm.value.endDate ?? ''
      };

      this.educationService.addEducation(educationToSend).subscribe({
        next: () => {
          this.showSuccessPopup();
          window.location.reload();
        },
        error: (err) => {
          console.error(err);
          if (err.status === 401) {
            this.errorMessage = 'Session expired. Please login again.';
          } else {
            this.errorMessage = 'Error completing education profile. Please try again.';
          }
          this.showErrorPopup(this.errorMessage);
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  showSuccessPopup() {
    this.popupTitle = 'Education Created!';
    this.popupMessage = 'Education successfully added to your profile!';
    this.popupIsSuccess = true;
    this.showCancelButton = false;
    this.showPopup = true;
  }

  showErrorPopup(errorMessage: string) {
    this.popupTitle = 'Education Creation Failed';
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
