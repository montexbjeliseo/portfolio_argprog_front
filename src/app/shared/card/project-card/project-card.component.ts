import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

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
