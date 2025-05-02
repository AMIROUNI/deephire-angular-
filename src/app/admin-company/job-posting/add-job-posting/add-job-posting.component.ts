import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobPostingService } from '../../../services/job-posting.service';
import { JobPosting } from '../../../models';

@Component({
  selector: 'app-add-job-posting',
  templateUrl: './add-job-posting.component.html',
  styleUrls: ['./add-job-posting.component.css'],
  standalone: false
})
export class AddJobPostingComponent {
  jobForm: FormGroup;
  successMessage = '';

  loading = false;

  //----------------------------------------------------

  
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;
  errorMessage!: string;

  showSectionsMenu: boolean = false;

  constructor(private fb: FormBuilder, private jobService: JobPostingService) {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      requirements: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    // Mark all fields as touched to trigger validation messages
    this.markFormGroupTouched(this.jobForm);

    if (this.jobForm.invalid) {
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const job: JobPosting = this.jobForm.value;

    this.jobService.addJobPosting(job).subscribe({
      next: (res) => {
         this.showSuccessPopup('Job posting added successfully!');
        this.loading = false;
        this.jobForm.reset();
        // Reset form validation state
        Object.keys(this.jobForm.controls).forEach(key => {
          this.jobForm.get(key)?.setErrors(null);
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to add job posting. Please try again.';
        this.showErrorPopup(this.errorMessage);
        if (err.error?.message) {
          this.errorMessage += ` Error: ${err.error.message}`;
        }
        this.loading = false;
        console.error('Error adding job posting:', err);
      }
    });
  } 

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper methods for template to check validation states
  hasError(controlName: string, errorName: string): boolean {
    const control = this.jobForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.jobForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }


  


  showSuccessPopup(message: string) {
    this.popupTitle = ' success !';
    this.popupMessage = message;
    this.popupIsSuccess = true;
    this.showCancelButton = true;
    this.showPopup = true;
  }

  showErrorPopup(errorMessage: string) {
    this.popupTitle = 'Error';
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