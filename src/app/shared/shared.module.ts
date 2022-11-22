import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { HttpClientModule } from '@angular/common/http';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AboutSectionComponent,
    ExperienceSectionComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AboutSectionComponent,
    ExperienceSectionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
