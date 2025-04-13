import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth-content/login/login.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { PostsFeedComponent } from './posts-feed/posts-feed.component';
import { JobPageComponent } from './job/job-page/job-page.component';
import { RegisterComponent } from './auth-content/register/register.component';
import { NotificationComponent } from './notification/notification.component';


const routes: Routes = [
  {path:'', component:LandingComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileCardComponent},
  {path:'feed',component:PostsFeedComponent},
  {path:'jobs',component:JobPageComponent},
  {path:'notification',component:NotificationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
