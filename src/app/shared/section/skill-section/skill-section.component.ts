import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../../model/model';
import { SkillSample } from '../../model/sample';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-skill-section',
  templateUrl: './skill-section.component.html',
  styleUrls: ['./skill-section.component.css']
})
export class SkillSectionComponent implements OnInit {

  @Input() data!: Skill[];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  add(){
    this.data.push(SkillSample);
  }

  delete(index: number) {
    this.data.splice(index, 1);
  }

}
