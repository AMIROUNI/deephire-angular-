import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-certification-form',
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.css'],
  standalone: false
})
export class CertificationFormComponent {
  @Output() cancel = new EventEmitter<void>();

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
      console.log('Certification Data:', this.certificationForm.value);
      // Tu peux envoyer les données au backend ici
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
