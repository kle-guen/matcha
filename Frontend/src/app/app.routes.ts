import {Routes} from '@angular/router';
import {PageLayoutComponent} from "./parts/page-layout/page-layout.component";
import {HomeComponent} from "./pages/components/home/home.component";
import {LoginComponent} from "./pages/components/login/login.component";

export const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
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
