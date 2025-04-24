import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Certification } from '../../models/profile/certification.model';

@Component({
  selector: 'app-certification-form',
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.css'],
  standalone: false
})
export class CertificationFormComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() submitCertification = new EventEmitter<Certification>();

  certificationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    issuer: new FormControl('', [Validators.required, Validators.minLength(2)]),
    issueDate: new FormControl('', [Validators.required]),
    expirationDate: new FormControl(''),
  });

  isInvalidAndTouchedOrDirty(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.certificationForm.valid) {
      const formValue = this.certificationForm.value;

      const certification: Certification = {
        name: formValue.name!,
        issuer: formValue.issuer!,
        issueDate: new Date(formValue.issueDate!),
        expirationDate: formValue.expirationDate ? new Date(formValue.expirationDate) : undefined,
      };

      this.submitCertification.emit(certification);
      console.log('Certification object sent:', certification);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
