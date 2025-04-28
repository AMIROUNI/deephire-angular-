import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Education } from '../../models';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css'],
  standalone: false
})
export class EducationFormComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() submitEducation = new EventEmitter<Education>();

  educationForm = new FormGroup({
    schoolName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    degree: new FormControl('', [Validators.required, Validators.minLength(2)]),
    fieldOfStudy: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl(''),
  });

  isInvalidAndTouchedOrDirty(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.educationForm.valid) {
      const education: Education = this.educationForm.value as Education;
      this.submitEducation.emit(education);
      console.log('Éducation:', education);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
