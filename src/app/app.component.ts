import { Component } from '@angular/core';
import { DataService } from './shared/service/data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title: string = 'Montex Bj Eliseo - Argentina Programa';

	loading = false;

	data!: any;

	constructor(private dataService: DataService){}

	ngOnInit(): void {
		this.loading = true;
		this.dataService.get().subscribe({
			next: (v)=>{
				this.data = v;
				this.loading = false;
			},
			error: (v)=>{
				this.loading = false;
			}
		});
	}
}
