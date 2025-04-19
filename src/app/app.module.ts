import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth-content/login/login.component';
import { HttpClientModule } from '@angular/common/http';

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
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { PopupComponent } from './modal/popup/popup.component';



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
    CompanyProfileComponent,
    PopupComponent







  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    


],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
