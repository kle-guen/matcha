import {Routes} from '@angular/router';
import {PageLayoutComponent} from "./parts/page-layout/page-layout.component";
import {ResearchMembersComponent} from "./pages/components/members/research-members/research-members.component";
import {LoginComponent} from "./pages/components/login/login.component";
import {CompleteProfileComponent} from "./pages/components/complete-profile/complete-profile.component";
import {RegisterComponent} from "./pages/components/register/register.component";
import {UserPage} from "./pages/components/members/member-page/member-page.component";
import {ResearchMembersResolver} from "./data/resolvers/research-members.resolver";
import {ChatComponent} from "./pages/components/chat/chat.component";
import {UpdateProfileComponent} from "./pages/components/update-profile/update-profile.component";
import {updateProfileResolver} from "./data/resolvers/update-profile.resolver";
import {ipInfoResolver} from "./data/resolvers/ip-info.resolver";

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
		resolve: {
			ipInfo: ipInfoResolver
		},
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
							users: ResearchMembersResolver
						},
						component: ResearchMembersComponent
					},
					{
						path: ':id',
						component: UserPage
					}
				]
			},
			{
				path: 'chat',
				component: ChatComponent,
				// resolve: {
				// 	matchs: MatchsResolver,
				// 	messages: MessagesResolver
				// }
			},
			{
				path: 'update-profile',
				resolve: {
					profile: updateProfileResolver
				},
				component: UpdateProfileComponent
			}
		]
	},
];
