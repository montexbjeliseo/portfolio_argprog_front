import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/login/login.component';
import { AuthenticatedGuard } from './shared/guard/authenticated.guard';

const routes: Routes = [
	{
		path: '', component: HomeComponent, pathMatch: 'full'
	},
	{
		path: 'login', component: LoginComponent, pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
