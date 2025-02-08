import {Component, inject, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../../../../ui/components/button/button.component";
import {MemberDto} from "../../../../data/dto/receive/member.dto";
import {Router} from "@angular/router";
import {GenderEnum} from "../../../../shared/enums/gender.enum";
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
	selector: 'app-member-card',
	standalone: true,
	imports: [
		MatCardModule,
		ButtonComponent,
		NgClass,
		MatIcon
	],
	templateUrl: './member-card.component.html',
	styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {

	/**
	 * The router.
	 * @private
	 */
	route = inject(Router)

	/**
	 * The user.
	 */
	@Input({required: true})
	member!: MemberDto;

	/**
	 * Navigate to the user page.
	 * @param user
	 */
	navigateToMemberPage(user: MemberDto) {
		this.route.navigate(['members', user.id],
			{
				state: {user: user}
			});
	}

	protected readonly GenderEnum = GenderEnum;
}
