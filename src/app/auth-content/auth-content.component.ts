import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';  

@Component({
  selector: 'app-auth-content',
  standalone: false,
  templateUrl: './auth-content.component.html',
  styleUrl: './auth-content.component.css',

})
export class AuthContentComponent {
   constructor(private axiosService: AxiosService) { }
  onLogin(input: any):void{
    this.axiosService.request(
       "POST",
     "/login",
     {
        "login": input.login,
        "password": input.password
     }

    )



  }
  

}
