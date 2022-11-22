import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { HttpClientModule } from '@angular/common/http';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { EducationSectionComponent } from './education-section/education-section.component';
import { SkillSectionComponent } from './skill-section/skill-section.component';
import { ProjectSectionComponent } from './project-section/project-section.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    SkillSectionComponent,
    ProjectSectionComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    SkillSectionComponent,
    ProjectSectionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
