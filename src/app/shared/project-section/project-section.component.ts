import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.css']
})
export class ProjectSectionComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
