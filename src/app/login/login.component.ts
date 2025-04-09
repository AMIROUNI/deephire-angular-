import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin=new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email,Validators.minLength(10)]),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),
  })




  isInvalidAndTouchedOrDirty(FormControl: FormControl): boolean {
   return FormControl.invalid && (FormControl.touched || FormControl.dirty);
  }


  onSubmit(){
    console.log(this.formLogin.value)
    // Perform login logic here
    // For example, send the form data to your backend API for authentication
  }

}
