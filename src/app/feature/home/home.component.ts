import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.get()
      .subscribe(body => this.data = body);
  }

}
