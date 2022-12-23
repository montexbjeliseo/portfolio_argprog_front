import { Component, OnInit, Input } from '@angular/core';
import { Experience } from '../../model/model';
import { ExperienceSample } from '../../model/sample';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})
export class ExperienceSectionComponent implements OnInit {

  @Input() data!: Experience[];

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.data.push(new ExperienceSample());
  }

  delete(index: number) {
    this.data.splice(index, 1);
  }

}
