import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutSectionComponent } from './sections/about-section/about-section.component';
import { ExperienceSectionComponent } from './sections/experience-section/experience-section.component';
import { EducationSectionComponent } from './sections/education-section/education-section.component';
import { SkillSectionComponent } from './sections/skill-section/skill-section.component';
import { ProjectSectionComponent } from './sections/project-section/project-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    SkillSectionComponent,
    ProjectSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
