import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.css']
})
export class ExperienceCardComponent implements OnInit {

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
