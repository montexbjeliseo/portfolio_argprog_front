import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../model/model';
import { ProjectSample } from '../../model/sample';

@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.css']
})
export class ProjectSectionComponent implements OnInit {

  @Input() data!: Project[];

  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.data.push(ProjectSample);
  }

}
