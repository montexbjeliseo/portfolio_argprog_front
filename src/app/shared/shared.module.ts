import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AboutSectionComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AboutSectionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
