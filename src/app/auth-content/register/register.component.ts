import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formRegister: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formRegister = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  isInvalidAndTouchedOrDirty(control: any): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.formRegister.valid) {
      console.log(this.formRegister.value);
      // TODO: Call your service to register the user
    } else {
      this.formRegister.markAllAsTouched();
    }
  }
}
