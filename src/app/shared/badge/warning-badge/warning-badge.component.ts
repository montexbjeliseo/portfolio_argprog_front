import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-warning-badge',
  templateUrl: './warning-badge.component.html',
  styleUrls: ['./warning-badge.component.css']
})
export class WarningBadgeComponent implements OnInit {

  @Input() text: string = "Warning";

  constructor() { }

  ngOnInit(): void {
  }

}
