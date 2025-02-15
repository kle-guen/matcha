import {Routes} from '@angular/router';
import {PageLayoutComponent} from "./parts/page-layout/page-layout.component";
import {ResearchMembersComponent} from "./pages/components/members/research-members/research-members.component";
import {LoginComponent} from "./pages/components/login/login.component";
import {CompleteProfileComponent} from "./pages/components/complete-profile/complete-profile.component";
import {RegisterComponent} from "./pages/components/register/register.component";
import {MemberProfile} from "./pages/components/members/member-profile/member-profile.component";
import {ResearchMembersResolver} from "./data/resolvers/research-members.resolver";
import {ChatComponent} from "./pages/components/chat/chat.component";
import {UpdateProfileComponent} from "./pages/components/update-profile/update-profile.component";
import {updateProfileResolver} from "./data/resolvers/update-profile.resolver";
import {ipInfoResolver} from "./data/resolvers/ip-info.resolver";
import {InterestsResolver} from "./data/resolvers/interests.resolver";
import {AuthGuard} from "./guards/auth.guard";
import {verifyEmailResolver} from "./data/resolvers/verify-email.resolver";
import {VerifyEmailComponent} from "./pages/components/verify-email/verify-email.component";
import {NotificationsComponent} from "./pages/components/notifications/notifications.component";
import {NotificationsResolver} from "./data/resolvers/notifications.resolver";
import {memberProfileResolver} from "./data/resolvers/members-profile.resolver";
import {ForgotPasswordComponent} from "./pages/components/forgot-password/forgot-password.component";

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
		path: 'verify-email',
		resolve: {
			isVerified: verifyEmailResolver
		},
		component: VerifyEmailComponent,
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent,
	},
	{
		path: 'complete-profile',
		canActivate: [AuthGuard],
		resolve: {
			ipInfo: ipInfoResolver,
			interests: InterestsResolver
		},
		component: CompleteProfileComponent,
	},
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},
	{
		path: '',
		component: PageLayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'members',
				children: [
					{
						path: '',
						resolve: {
							members: ResearchMembersResolver,
							interests: InterestsResolver
						},
						component: ResearchMembersComponent
					},
					{
						path: ':id',
						resolve: {
							member: memberProfileResolver
						},
						component: MemberProfile
					}
				]
			},
			{
				path: 'notifications',
				resolve: {
					notifications: NotificationsResolver
				},
				component: NotificationsComponent,
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
					user: updateProfileResolver,
					interests: InterestsResolver
				},
				component: UpdateProfileComponent,
				runGuardsAndResolvers: 'always'
			},
		]
	},
	{path: '**', redirectTo: '/login'}
];
