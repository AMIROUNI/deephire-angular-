import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth-content/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { EducationFormComponent } from './profile-card/education-form/education-form.component';
import { ProfileSectionsComponent } from './profile-card/profile-sections/profile-sections.component';
import { ExperienceFormComponent } from './profile-card/experience-form/experience-form.component';
import { SkillFormComponent } from './profile-card/skill-form/skill-form.component';
import { CertificationFormComponent } from './profile-card/certification-form/certification-form.component';
import { PostsFeedComponent } from './posts-feed/posts-feed.component';
import { PostCreateComponent } from './posts-feed/post-create/post-create.component';
import { PostDisplayComponent } from './posts-feed/post-display/post-display.component';
import { JobPageComponent } from './job/job-page/job-page.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { JobDetailsComponent } from './job/job-details/job-details.component';
import { AuthContentComponent } from './auth-content/auth-content.component';
import { NotificationComponent } from './notification/notification.component';
import { RegisterComponent } from './auth-content/register/register.component';
import { NotificationCardComponent } from './notification/notification-card/notification-card.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PostManagementComponent } from './admin/post-management/post-management.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatCardsComponent } from './admin/dashboard/components/stat-cards/stat-cards.component';
import { CourbeutilisateursconnecteComponent } from './admin/dashboard/components/courbeutilisateursconnecte/courbeutilisateursconnecte.component';
import { LatestusersComponent } from './admin/dashboard/components/latestusers/latestusers.component';
import { StattotalpostComponent } from './admin/post-management/stattotalpost/stattotalpost.component';
import { ActivepostComponent } from './admin/post-management/activepost/activepost.component';
import { CreatedpostcourbeComponent } from './admin/post-management/createdpostcourbe/createdpostcourbe.component';
import { EtatpostcourbeComponent } from './admin/post-management/etatpostcourbe/etatpostcourbe.component';
import { PublicationlistComponent } from './admin/post-management/publicationlist/publicationlist.component';
import { UsertableComponent } from './admin/user-management/usertable/usertable.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    LoginComponent,
    VideoPlayerComponent,
    ProfileCardComponent,
    EducationFormComponent,
    ProfileSectionsComponent,
    ExperienceFormComponent,
    SkillFormComponent,
    CertificationFormComponent,
    PostsFeedComponent,
    PostCreateComponent,
    PostDisplayComponent,
    JobPageComponent,
    JobListComponent,
    JobDetailsComponent,
    NotificationComponent,
RegisterComponent,
    AuthContentComponent,
    NotificationCardComponent,
    DashboardComponent,
    UserManagementComponent,
    PostManagementComponent,
    StatCardsComponent,
    CourbeutilisateursconnecteComponent,
    LatestusersComponent,
    StattotalpostComponent,
    ActivepostComponent,
    CreatedpostcourbeComponent,
    EtatpostcourbeComponent,
    PublicationlistComponent,
    UsertableComponent
    







  ],
  imports: [
BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    




],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
