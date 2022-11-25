import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../../model/model';
import { SkillSample } from '../../model/sample';

@Component({
  selector: 'app-skill-section',
  templateUrl: './skill-section.component.html',
  styleUrls: ['./skill-section.component.css']
})
export class SkillSectionComponent implements OnInit {

  @Input() data!: Skill[];

  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.data.push(SkillSample);
  }

}
