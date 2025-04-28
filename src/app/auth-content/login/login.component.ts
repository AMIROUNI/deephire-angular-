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
        this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
      }
    });
  } 


}
