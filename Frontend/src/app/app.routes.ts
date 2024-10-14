import {Routes} from '@angular/router';
import {PageLayoutComponent} from "./parts/page-layout/page-layout.component";
import {HomeComponent} from "./pages/components/home/home.component";
import {LoginComponent} from "./pages/components/login/login.component";
import {CompleteProfileComponent} from "./pages/components/complete-profile/complete-profile.component";
import {RegisterComponent} from "./pages/components/register/register.component";
import {UsersComponent} from "./pages/components/users/users.component";
import {UsersResolver} from "./data/resolvers/users.resolver";
import {ChatComponent} from "./pages/components/chat/chat.component";

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
		path: 'users',
		component: PageLayoutComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: '', component: HomeComponent,
				resolve: {
					users: UsersResolver
				},
			},
			{
				path: ':id',
				component: UsersComponent
			}
		]
	},
	{
		path: 'chat',
		component: ChatComponent
	}
];
