import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skill-section',
  templateUrl: './skill-section.component.html',
  styleUrls: ['./skill-section.component.css']
})
export class SkillSectionComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
