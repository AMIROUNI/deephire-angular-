import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CertificationService } from '../../services/certification.service';
import { Certification } from '../../models';

@Component({
  selector: 'app-certification-form',
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.css'],
  standalone: false
})
export class CertificationFormComponent {
  @Output() cancel = new EventEmitter<void>();

  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;
  errorMessage!: string;

  constructor(private certificationService: CertificationService) {}

  certificationForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    issuer: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    issueDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    expirationDate: new FormControl('', { nonNullable: false }),
  });

  isInvalidAndTouchedOrDirty(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.certificationForm.valid) {
      const certificationToSend: Certification = {
        name: this.certificationForm.value.name!,
        issuer: this.certificationForm.value.issuer!,
        issueDate: this.certificationForm.value.issueDate!,
        expirationDate: this.certificationForm.value.expirationDate ?? undefined
      };

      this.certificationService.addCertification(certificationToSend).subscribe({
        next: () => {
          this.showSuccessPopup();
          window.location.reload();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.status === 401
            ? 'Session expired. Please login again.'
            : 'Error adding certification. Please try again.';
          this.showErrorPopup(this.errorMessage);
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  showSuccessPopup() {
    this.popupTitle = 'Certification Created!';
    this.popupMessage = 'Certification successfully added to your profile!';
    this.popupIsSuccess = true;
    this.showCancelButton = false;
    this.showPopup = true;
  }

  showErrorPopup(errorMessage: string) {
    this.popupTitle = 'Certification Creation Failed';
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
