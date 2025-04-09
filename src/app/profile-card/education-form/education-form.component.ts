import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css'],
  standalone: false
})
export class EducationFormComponent {
  @Output() cancel = new EventEmitter<void>();

  educationForm = new FormGroup({
    schoolName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    degree: new FormControl('', [Validators.required, Validators.minLength(2)]),
    fieldOfStudy: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('')
  });

  isInvalidAndTouchedOrDirty(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.educationForm.valid) {
      console.log('Éducation:', this.educationForm.value);
      // Tu peux ajouter un service ici
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
