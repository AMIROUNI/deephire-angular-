import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth-content/login/login.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { PostsFeedComponent } from './posts-feed/posts-feed.component';
import { JobPageComponent } from './job/job-page/job-page.component';
import { RegisterComponent } from './auth-content/register/register.component';
import { NotificationComponent } from './notification/notification.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { ProfileCompletionComponent } from './profile-card/profile-completion/profile-completion.component';
import { RecruiterManagementComponent } from './admin-company/recruiter-management/recruiter-management.component';
import { AddRecruiterComponent } from './admin-company/add-recruiter/add-recruiter.component';
import { DisplayRecruiterComponent } from './admin-company/display-recruiter/display-recruiter.component';
import { EditRhCompanyComponent } from './admin-company/edit-rh-company/edit-rh-company.component';


const routes: Routes = [
  {path:'', component:LandingComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileCardComponent},
  {path:'feed',component:PostsFeedComponent},
  {path:'jobs',component:JobPageComponent},
  {path:'notification',component:NotificationComponent},
  {path:'company/:id',component:CompanyProfileComponent
  },
  {path:'recruiter-management',component: RecruiterManagementComponent},
  {path:'add-recruiter-management',component: AddRecruiterComponent}, // Assuming RecruiterManagementComponent is defined elsewhere
  {path:'profile/completion',component:ProfileCompletionComponent },
  {path:'recruiter-dispaly',component: DisplayRecruiterComponent},
  {path:'edit-rh-company/:id',component:EditRhCompanyComponent
  }, // Assuming RecruiterManagementComponent is defined elsewhere
   // Assuming ProfileCardComponent handles profile completion
  {path:'**', redirectTo:''} // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
