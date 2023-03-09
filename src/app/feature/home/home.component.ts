import { AnimationStyleMetadata } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs';
import { catchError } from 'rxjs/operators'
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
    this.dataService.get().subscribe({
      next: (v) => { this.data = v }, error: (e) => {
      console.log(e);
    }});
  }

}
