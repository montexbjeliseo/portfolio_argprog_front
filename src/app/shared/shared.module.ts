import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutSectionComponent } from './section/about-section/about-section.component';
import { HttpClientModule } from '@angular/common/http';
import { ExperienceSectionComponent } from './section/experience-section/experience-section.component';
import { EducationSectionComponent } from './section/education-section/education-section.component';
import { SkillSectionComponent } from './section/skill-section/skill-section.component';
import { ProjectSectionComponent } from './section/project-section/project-section.component';
import { EditButtonComponent } from './button/edit-button/edit-button.component';
import { AddButtonComponent } from './button/add-button/add-button.component';
import { DeleteButtonComponent } from './button/delete-button/delete-button.component';
import { VButtonComponent } from './button/v-button/v-button.component';
import { EducationCardComponent } from './card/education-card/education-card.component';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from './button/x-button/x-button.component';
import { SkillCardComponent } from './card/skill-card/skill-card.component';
import { ProjectCardComponent } from './card/project-card/project-card.component';
import { ExperienceCardComponent } from './card/experience-card/experience-card.component';
import { WarningBadgeComponent } from './badge/warning-badge/warning-badge.component';
import { LoadingSpinnerComponent } from './spinner/loading-spinner/loading-spinner.component';
import { LinkButtonComponent } from './button/link-button/link-button.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    SkillSectionComponent,
    ProjectSectionComponent,
    EditButtonComponent,
    AddButtonComponent,
    DeleteButtonComponent,
    VButtonComponent,
    EducationCardComponent,
    XButtonComponent,
    SkillCardComponent,
    ProjectCardComponent,
    ExperienceCardComponent,
    WarningBadgeComponent,
    LoadingSpinnerComponent,
    LinkButtonComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    SkillSectionComponent,
    ProjectSectionComponent,
    EditButtonComponent,
    AddButtonComponent,
    DeleteButtonComponent,
    VButtonComponent,
    EducationCardComponent,
    XButtonComponent,
    SkillCardComponent,
    ProjectCardComponent,
    ExperienceCardComponent,
    WarningBadgeComponent,
    LoadingSpinnerComponent,
    LinkButtonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ]
})
export class SharedModule { }
