import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth-content/login/login.component';
import { RegisterComponent } from './auth-content/register/register.component';

import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { UserSearchComponent } from './components/user-search/user-search.component';

import { ProfileCardComponent } from './profile-card/profile-card.component';
import { EducationFormComponent } from './profile-card/education-form/education-form.component';
import { ProfileSectionsComponent } from './profile-card/profile-sections/profile-sections.component';
import { ExperienceFormComponent } from './profile-card/experience-form/experience-form.component';
import { SkillFormComponent } from './profile-card/skill-form/skill-form.component';
import { CertificationFormComponent } from './profile-card/certification-form/certification-form.component';
import { ProfileCompletionComponent } from './profile-card/profile-completion/profile-completion.component';
import { ProfileUpdateComponent } from './profile-card/profile-update/profile-update.component';
import { PostsComponent } from './profile-card/user-posts/posts/posts.component';

import { PostsFeedComponent } from './posts-feed/posts-feed.component';
import { PostCreateComponent } from './posts-feed/post-create/post-create.component';
import { PostDisplayComponent } from './posts-feed/post-display/post-display.component';
import { PostUpdateComponent } from './posts-feed/post-update/post-update.component';

import { NotificationComponent } from './notification/notification.component';
import { NotificationCardComponent } from './notification/notification-card/notification-card.component';

import { PopupComponent } from './modal/popup/popup.component';

import { JobPageComponent } from './job/job-page/job-page.component';

import { AddRecruiterComponent } from './admin-company/add-recruiter/add-recruiter.component';
import { DisplayRecruiterComponent } from './admin-company/display-recruiter/display-recruiter.component';
import { EditRhCompanyComponent } from './admin-company/edit-rh-company/edit-rh-company.component';
import { RecruiterManagementComponent } from './admin-company/recruiter-management/recruiter-management.component';
import { CompanyProfileComponent } from './admin-company/company-profile/company-profile.component';
import { UpdateCompanyProfileComponent } from './admin-company/update-company-profile/update-company-profile.component';
import { DashboardAdminCompanyComponent } from './admin-company/dashboard-admin-company/dashboard-admin-company.component';
import { KpiCardsAcComponent } from './admin-company/dashboard-admin-company/kpi-cards-ac/kpi-cards-ac.component';
import { RecruiterGrowithChartComponent } from './admin-company/dashboard-admin-company/recruiter-growith-chart/recruiter-growith-chart.component';
import { JobPostingAcComponent } from './admin-company/dashboard-admin-company/job-posting-ac/job-posting-ac.component';
import { WelocmeCardAcComponent } from './admin-company/dashboard-admin-company/welocme-card-ac/welocme-card-ac.component';
import { AddJobPostingComponent } from './admin-company/job-posting/add-job-posting/add-job-posting.component';
import { AdminJobPageComponent } from './admin-company/job-posting/job-posting.component';
import { DisplayJobPostingsComponent } from './admin-company/job-posting/display-job-postings/display-job-postings.component';
import { JobEditComponent } from './admin-company/job-posting/job-edit/job-edit.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { WelcomeCardComponent } from './admin/components/welcome-card/welcome-card.component';
import { KpiCardsComponent } from './admin/components/kpi-cards/kpi-cards.component';
import { UserGrowthChartComponent } from './admin/components/user-growth-chart/user-growth-chart.component';
import { JobPostingChartComponent } from './admin/components/job-posting-chart/job-posting-chart.component';
import { TopCompaniesComponent } from './admin/components/top-companies/top-companies.component';
import { ApplicationStatusComponent } from './admin/components/application-status/application-status.component';
import { RecentActivityComponent } from './admin/components/recent-activity/recent-activity.component';
import { SettingsDropdownComponent } from './admin/components/settings-dropdown/settings-dropdown.component';
import { CompanyGrowthChartComponent } from './admin/components/company-growth-chart/company-growth-chart.component';
import { Top5ByCopanyCreatedComponent } from './admin/components/top-5-by-copany-created/top-5-by-copany-created.component';

import { UserManagementComponent } from './admin/user-management/user-management.component';
import { CompanyManagementComponent } from './admin/company-management/company-management.component';
import { AppliedJobsComponent } from './job/applied-jobs/applied-jobs.component';

import { ChatComponent } from './chat/chat.component';
import { ChatMailboxComponent } from './chat/chat-mailbox/chat-mailbox.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { NewMessageComponent } from './chat/new-message/new-message.component';

import { NotFoundComponent } from './not-found/not-found.component';

import { ApexChartsModule } from '../apex-charts.module';
import { AppRoutingModule } from './app-routing.module';
import { JobApplicationsComponent } from './admin-company/job-application/job-applications.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    VideoPlayerComponent,
    UserSearchComponent,
    ProfileCardComponent,
    EducationFormComponent,
    ProfileSectionsComponent,
    ExperienceFormComponent,
    SkillFormComponent,
    CertificationFormComponent,
    ProfileCompletionComponent,
    ProfileUpdateComponent,
    PostsComponent,
    PostsFeedComponent,
    PostCreateComponent,
    PostDisplayComponent,
    PostUpdateComponent,
    NotificationComponent,
    NotificationCardComponent,
    PopupComponent,
    JobPageComponent,
    AddRecruiterComponent,
    DisplayRecruiterComponent,
    EditRhCompanyComponent,
    RecruiterManagementComponent,
    CompanyProfileComponent,

    ChatComponent,
      NotFoundComponent,
      WelcomeCardComponent,
      KpiCardsComponent,
      UserGrowthChartComponent,
      JobPostingChartComponent,
      TopCompaniesComponent,
      ApplicationStatusComponent,
      RecentActivityComponent,
      SettingsDropdownComponent,
      DashboardComponent,
      ProfileUpdateComponent,
      ChatMailboxComponent,
      ChatWindowComponent,
      NewMessageComponent,
      UserSearchComponent,
      AddJobPostingComponent,
      AdminJobPageComponent,
      DisplayJobPostingsComponent,
      JobEditComponent,
      DashboardAdminCompanyComponent,
      KpiCardsAcComponent,
      RecruiterGrowithChartComponent,
      JobPostingAcComponent,
      WelocmeCardAcComponent,
      UpdateCompanyProfileComponent,
      WelocmeCardAcComponent,
      JobEditComponent,
      PostUpdateComponent,
      CompanyGrowthChartComponent,
      Top5ByCopanyCreatedComponent,
      UserManagementComponent,
      CompanyManagementComponent,
      AppliedJobsComponent,
      JobApplicationsComponent








  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApexChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
