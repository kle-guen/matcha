import {Routes} from '@angular/router';
import {PageLayoutComponent} from "./parts/page-layout/page-layout.component";
import {HomeComponent} from "./pages/components/home/home.component";
import {LoginComponent} from "./pages/components/login/login.component";
import {CompleteProfileComponent} from "./pages/components/complete-profile/complete-profile.component";
import {RegisterComponent} from "./pages/components/register/register.component";

export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
	{
		path: 'complete-profile',
		component: CompleteProfileComponent,
	},

	{
		path: '',
		component: PageLayoutComponent,
		// canActivate: [AuthGuard],
		children: [
			{path: 'users', component: HomeComponent},
		]
	},
];
