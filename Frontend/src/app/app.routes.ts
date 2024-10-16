import {Routes} from '@angular/router';
import {PageLayoutComponent} from "./parts/page-layout/page-layout.component";
import {ResearchUsersComponent} from "./pages/components/users/research-users/research-users.component";
import {LoginComponent} from "./pages/components/login/login.component";
import {CompleteProfileComponent} from "./pages/components/complete-profile/complete-profile.component";
import {RegisterComponent} from "./pages/components/register/register.component";
import {UserPage} from "./pages/components/users/user-page/user-page.component";
import {ResearchUsersResolver} from "./data/resolvers/research-users.resolver";
import {ChatComponent} from "./pages/components/chat/chat.component";
import {UpdateProfileComponent} from "./pages/components/update-profile/update-profile.component";

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
			{
				path: 'users',
				children: [
					{
						path: '',
						resolve: {
							users: ResearchUsersResolver
						},
						component: ResearchUsersComponent
					},
					{
						path: ':id',
						component: UserPage
					}
				]
			},
			{
				path: 'chat',
				component: ChatComponent
			},
			{
				path: 'update-profile',
				component: UpdateProfileComponent
			}
		]
	},
];
