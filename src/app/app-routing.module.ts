import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { PostsFeedComponent } from './posts-feed/posts-feed.component';
import { JobPageComponent } from './job/job-page/job-page.component';


const routes: Routes = [
  {path:'', component:LandingComponent},
  {path:'login', component:LoginComponent},
  {path:'profile', component:ProfileCardComponent},
  {path:'feed',component:PostsFeedComponent},
  {path:'jobs',component:JobPageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
