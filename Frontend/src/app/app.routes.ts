import {Routes} from '@angular/router';
import {PageLayoutComponent} from "./components/page-layout/page-layout.component";
import {HomeComponent} from "./components/home/home.component";
import {LandingComponent} from "./components/landing/landing.component";

export const routes: Routes = [
	{
		path: '',
		component: LandingComponent,
	},
	{
		path: 'home',
		component: PageLayoutComponent,
		// canActivate: [AuthGuard],
		children: [
			{path: '', component: HomeComponent},
		]
	},
];
