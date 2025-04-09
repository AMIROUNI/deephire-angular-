import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css'],
  standalone: false
})
export class ExperienceFormComponent {
  @Output() cancel = new EventEmitter<void>();

  experienceForm = new FormGroup({
    companyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    title: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl(''),
    description: new FormControl('')
  });

  isInvalidAndTouchedOrDirty(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.experienceForm.valid) {
      console.log(this.experienceForm.value);
      // Emit or handle experience data here
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
