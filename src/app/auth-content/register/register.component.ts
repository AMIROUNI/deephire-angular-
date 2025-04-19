import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupRequest } from '../../models/auth/signup-request';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FileUtils } from '../../models/utils/file-utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone:false

})
export class RegisterComponent {
  formRegister: FormGroup;
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;

  selectedFile: File | null = null;


  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.formRegister = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      role: ['', [Validators.required]],
      file: [null]  // Optional, validated based on selected role
    });
  }

  isInvalidAndTouchedOrDirty(control: any): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  showSuccessPopup() {
    this.popupTitle = 'Account Created!';
    this.popupMessage = 'Your account has been successfully created.';
    this.popupIsSuccess = true;
    this.popupRedirectPath = '/login';
    this.showCancelButton = false;
    this.showPopup = true;
  }

  showErrorPopup(errorMessage: string) {
    this.popupTitle = 'Registration Failed';
    this.popupMessage = errorMessage;
    this.popupIsSuccess = false;
    this.popupRedirectPath = null;
    this.showCancelButton = true;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      FileUtils.toBase64(file).then(base64String => {
        this.formRegister.patchValue({
          file: base64String
        });
      }).catch(error => {
        console.error('File reading error:', error);
      });
    }
  }
  

  onSubmit(): void {
    if (this.formRegister.valid) {
      const roleSelected = this.formRegister.value.role;
      const fileInput = this.formRegister.value.file;
  
      const signupData: any = {
        username: this.formRegister.value.username,
        firstname: this.formRegister.value.firstName,
        lastname: this.formRegister.value.lastName,
        email: this.formRegister.value.email,
        password: this.formRegister.value.password,
        role: [roleSelected]
      };
  
      // Only add file if role is ADMIN_COMPANY and file exists
      if (roleSelected === 'ADMIN_COMPANY' && fileInput) {
        signupData.file = fileInput;
      }
  
      this.authService.registerUser(signupData).subscribe({
        next: () => this.showSuccessPopup(),
        error: (error) => {
          const errorMsg = error.error?.message || 'An unexpected error occurred.';
          this.showErrorPopup(errorMsg);
        }
      });
  
    } else {
      this.formRegister.markAllAsTouched();
    }
  }
  
}