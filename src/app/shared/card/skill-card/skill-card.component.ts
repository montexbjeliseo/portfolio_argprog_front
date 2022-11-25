import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent implements OnInit {

  @Input() data: any;

  editting = false;
  visible = true;

  constructor() { }

  ngOnInit(): void {
  }

  hide(){
    this.visible = false;
  }

  edit(){}

  save(){}

  reset(){}

}
