import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
// popup variables ///////////////////////////////////////////////////////////////
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;


  //data: string[] = [];

   @Output() onSubmitLoginEvent = new EventEmitter();
   login :string='';
   password :string='';
  constructor(private authService: AuthService, private router: Router) { }

  formLogin=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(4)]),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),
  })




  isInvalidAndTouchedOrDirty(FormControl: FormControl): boolean {
   return FormControl.invalid && (FormControl.touched || FormControl.dirty);
  }
  errorMessage : string = '';

  onSubmitLogin(): void {

    if (this.formLogin.invalid) return;

    const credentials = {
      username: this.formLogin.get('username')?.value || '',
      password: this.formLogin.get('password')?.value || ''
    };

    console.log("credentials",credentials)

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log("token from login :   ",res.token)
        this.authService.saveToken(res.token);
        this.authService.redirectByRole();
        // redirection selon le rôle
      },
      error: (err) => {
        console.log("error from login : ************************  ",err.status)
        if (err.status === 403) {
          this.errorMessage = "Access denied: your account is banned.Please contact the support Team.";
          this.showErrorPopup(this.errorMessage);
        }
        else{
          this.errorMessage = "Une erreur est survenue lors de la connexion.";
          this.showErrorPopup(this.errorMessage);
        }

      }
    });
  }


  /// popup methods //////////////////////////////////////////

  showSuccessPopup() {
    this.popupTitle = 'Account Created!';
    this.popupMessage = 'Your account has been successfully created.';
    this.popupIsSuccess = true;
    this.popupRedirectPath = '/login';
    this.showCancelButton = false;
    this.showPopup = true;
  }

  showErrorPopup(errorMessage: string) {
    this.popupTitle = 'Login Failed';
    this.popupMessage = errorMessage;
    this.popupIsSuccess = false;
    this.popupRedirectPath = null;
    this.showCancelButton = true;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
////////////////////////////////////



}
