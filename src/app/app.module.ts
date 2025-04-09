import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { EducationFormComponent } from './profile-card/education-form/education-form.component';
import { ProfileSectionsComponent } from './profile-card/profile-sections/profile-sections.component';
import { ExperienceFormComponent } from './profile-card/experience-form/experience-form.component';
import { SkillFormComponent } from './profile-card/skill-form/skill-form.component';
import { CertificationFormComponent } from './profile-card/certification-form/certification-form.component';
import { PostsFeedComponent } from './posts-feed/posts-feed.component';



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


  
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
