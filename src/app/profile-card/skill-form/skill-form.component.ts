import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css'],
  standalone: false,
})
export class SkillFormComponent {
  @Output() cancel = new EventEmitter<void>();

  skillForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  isInvalidAndTouchedOrDirty(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.skillForm.valid) {
      console.log('Skill Data:', this.skillForm.value);
      // You can emit the data or send it to a service
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
