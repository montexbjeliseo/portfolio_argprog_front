import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { DataService } from '../../service/data.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent implements OnInit {

  @Input() data: any;

  edittingName = false;
  edittingAbout = false;
  edittingContact = false;

  @ViewChild("firstName") firstNameBox!: ElementRef;
  @ViewChild("lastName") lastNameBox!: ElementRef;

  @ViewChild("aboutMe") aboutMe!: ElementRef;

  @ViewChild("email") email!: ElementRef;
  @ViewChild("phoneNumber") phoneNumber!: ElementRef;

  constructor(public authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
  }

  editName(){
    this.edittingName = true;
  }

  saveName(){
    this.edittingName = false;
    this.dataService.changeName(
      this.firstNameBox.nativeElement.innerText, 
      this.lastNameBox.nativeElement.innerText
      ).subscribe({
        next: (v) => {
          //It is all ok
        },
        error: (e) => {
          this.alertError();
        }
      });
  }

  resetName(){
    this.edittingName = false;
  }

  editAbout(){
    this.edittingAbout = true;
  }

  saveAbout(){
    this.edittingAbout = false;
    this.dataService.changeAbout(this.aboutMe.nativeElement.innerText).subscribe({
      next: (v) => {
        //It is all ok
      },
      error: (e) => {
        this.alertError();
      }
    });
  }

  alertError(){
    Swal.fire(
      'Error',
      'Ocurrió un error',
      'warning'
    );
  }

  resetAbout(){
    this.edittingAbout = false;
  }

  editContact(){
    this.edittingContact = true;
  }

  resetContact(){
    this.edittingContact = false;
  }

  saveContact(){
    this.edittingContact = false;
    this.dataService.changeContact(this.email.nativeElement.innerText, this.phoneNumber.nativeElement.innerText).subscribe({
      next: (v) => {
        //It is all ok
      },
      error: (e) => {
        this.alertError();
      }
    })
  }

}
