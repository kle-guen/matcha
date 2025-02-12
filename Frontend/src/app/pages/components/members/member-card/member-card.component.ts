import {Component, inject, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../../../../ui/components/button/button.component";
import {MemberDto} from "../../../../data/dto/receive/member.dto";
import {Router} from "@angular/router";
import {GenderEnum} from "../../../../shared/enums/gender.enum";
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {ImagesHttpService} from "../../../../data/http/images-http.service";

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
export class MemberCardComponent implements OnInit {

	/**
	 * The router.
	 * @private
	 */
	private readonly route = inject(Router)

	/**
	 * The images http service.
	 * @private
	 */
	private readonly imagesHttpService = inject(ImagesHttpService);

	/**
	 * The user.
	 */
	@Input({required: true})
	member!: MemberDto;

	ngOnInit() {
		this.imagesHttpService.getImage(this.member.pictures?.profilePicture || '').subscribe({
			next: (img) => {
				if (this.member.pictures) {
					this.member.pictures.profilePicture = this.imagesHttpService.loadUserImage(img);
				}
			},
			error: () => {
				if (this.member.pictures) {
					this.member.pictures.profilePicture = null;
				}
			}
		});
	}

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
