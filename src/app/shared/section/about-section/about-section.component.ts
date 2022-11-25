import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent implements OnInit {

  @Input() data: any;

  edittingName = false;

  edittingAbout = false;

  constructor() { }

  ngOnInit(): void {
  }

  editName(){
    this.edittingName = true;
  }

  saveName(){
    this.edittingName = false;
  }

  resetName(){
    this.edittingName = false;
  }

  editAbout(){
    this.edittingAbout = true;
  }

  saveAbout(){
    this.edittingAbout = false;
  }

  resetAbout(){
    this.edittingAbout = false;
  }

}
