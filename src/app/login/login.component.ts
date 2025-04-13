import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AxiosService } from '../axios.service';

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
  constructor(private axiosService: AxiosService) { }

  formLogin=new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email,Validators.minLength(10)]),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),
  })




  isInvalidAndTouchedOrDirty(FormControl: FormControl): boolean {
   return FormControl.invalid && (FormControl.touched || FormControl.dirty);
  }


  onSubmitLogin(): void{
    this.onSubmitLoginEvent.emit({"login": this.login, "password": this.password});
    // Perform login logic here
    // For example, send the form data to your backend API for authentication
  }

/*
   ngOnInit():void{
    this.axiosService.request('get','/message').then((response)=>{
      console.log(response.data)
      this.data=response.data
    }).catch((error)=>{
      console.log(error)
    })}

*/


}