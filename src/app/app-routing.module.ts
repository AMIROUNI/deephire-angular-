import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth-content/login/login.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { PostsFeedComponent } from './posts-feed/posts-feed.component';
import { JobPageComponent } from './job/job-page/job-page.component';
import { RegisterComponent } from './auth-content/register/register.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileCompletionComponent } from './profile-card/profile-completion/profile-completion.component';

import { RecruiterManagementComponent } from './admin-company/recruiter-management/recruiter-management.component';
import { AddRecruiterComponent } from './admin-company/add-recruiter/add-recruiter.component';
import { DisplayRecruiterComponent } from './admin-company/display-recruiter/display-recruiter.component';
import { EditRhCompanyComponent } from './admin-company/edit-rh-company/edit-rh-company.component';

import { ChatComponent } from './chat/chat.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CompanyProfileComponent } from './admin-company/company-profile/company-profile.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileUpdateComponent } from './profile-card/profile-update/profile-update.component';
import { NewMessageComponent } from './chat/new-message/new-message.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { AddJobPostingComponent } from './admin-company/job-posting/add-job-posting/add-job-posting.component';
import { DisplayJobPostingsComponent } from './admin-company/job-posting/display-job-postings/display-job-postings.component';

import { AdminJobPageComponent } from './admin-company/job-posting/job-posting.component';
import { JobEditComponent } from './admin-company/job-posting/job-edit/job-edit.component';
import { KpiCardsAcComponent } from './admin-company/dashboard-admin-company/kpi-cards-ac/kpi-cards-ac.component';
import { RecruiterGrowithChartComponent } from './admin-company/dashboard-admin-company/recruiter-growith-chart/recruiter-growith-chart.component';
import { JobPostingAcComponent } from './admin-company/dashboard-admin-company/job-posting-ac/job-posting-ac.component';
import { WelcomeCardComponent } from './admin/components/welcome-card/welcome-card.component';
import { WelocmeCardAcComponent } from './admin-company/dashboard-admin-company/welocme-card-ac/welocme-card-ac.component';
import { DashboardAdminCompanyComponent } from './admin-company/dashboard-admin-company/dashboard-admin-company.component';
import { PostsComponent } from './profile-card/user-posts/posts/posts.component';

const routes: Routes = [
  {path:'', component:LandingComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileCardComponent},
  {path:'feed',component:PostsFeedComponent},
  {path:'jobs',component:JobPageComponent},
  {path:'notification',component:NotificationComponent},
  {path:'posts/:username',component:PostsComponent},


  {path:'recruiter-management',component: RecruiterManagementComponent},
  {path:'add-recruiter-management',component: AddRecruiterComponent},
// Assuming RecruiterManagementComponent is defined elsewhere
  {path:' ',component:ProfileCompletionComponent },
  {path:'recruiter-dispaly',component: DisplayRecruiterComponent},
  {path:'edit-rh-company/:id',component:EditRhCompanyComponent
  }, // Assuming RecruiterManagementComponent is defined elsewhere
 {path:'complete-profile-company',component:CompanyProfileComponent},
  {path:'profile/completion',component:ProfileCompletionComponent },
  {path:"chat",component:ChatComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'profile/update',component:ProfileUpdateComponent},
  {
    path: 'profile/:username',
    component: ProfileCardComponent
  },
  {
    path: 'newMessage/:username',
    component: NewMessageComponent
  }
  ,{path:'add-job-posting',component:AddJobPostingComponent},
  {path:'display-job-posting',component:DisplayJobPostingsComponent},
  {path:'manage-jobs',component:AdminJobPageComponent},
  {path:'edit-jobs',component:JobEditComponent},


  //******************************************************** */

  {path:'kpi',component:KpiCardsAcComponent},
  {path:'recruiter-growth-chart',component:RecruiterGrowithChartComponent},
  {path:'job-posting-ac',component:JobPostingAcComponent}, // Assuming RecruiterGrowthChartComponent is defined elsewhere
  {path:'welcome-card-ac',component:WelocmeCardAcComponent}, 
  {path:'dashboard-admin-company',component:DashboardAdminCompanyComponent},
  {
    path: 'search',
    component: UserSearchComponent
  },


  {path:'**', component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
