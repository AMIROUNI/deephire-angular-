import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Experience } from '../../models';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css'],
  standalone: false
})
export class ExperienceFormComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() submitExperience = new EventEmitter<Experience>();

  experienceForm = new FormGroup({
    companyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    title: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    description: new FormControl(''),
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
        startDate: new Date(formValue.startDate!), // Convert string to Date
        endDate: formValue.endDate ? new Date(formValue.endDate) : undefined,
        description: formValue.description ?? '',
      };

      this.submitExperience.emit(experience);
      console.log('Expérience soumise:', experience);
    }
  }


  onCancel() {
    this.cancel.emit();
  }
}
