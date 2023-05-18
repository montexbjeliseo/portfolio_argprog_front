import { AnimationStyleMetadata } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { retry } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { AuthService } from 'src/app/shared/service/auth.service';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data!: any;

  @Output('loaded') 
  loaded = new EventEmitter<any>();

  RETRIEVING = 0;
  ERROR = 1;
  SHOW = 2;

  state = this.RETRIEVING;

  constructor(private dataService: DataService, authService: AuthService) { }

  ngOnInit(): void {
    this.load_data();
  }

  load_data(){
    this.state = this.RETRIEVING;
    this.dataService.get().subscribe({
      next: (v) => {
        this.data = v;
        this.state = this.SHOW;
        this.loaded.emit(this.data);
      }, error: (err) => {
        this.state = this.ERROR;
        this.loaded.emit(null);
        console.log(err);
      }
    });
  }

}
