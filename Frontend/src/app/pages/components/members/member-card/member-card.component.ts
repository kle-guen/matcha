import {Component, inject, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {ButtonComponent} from "../../../../ui/components/button/button.component";
import {MemberDto} from "../../../../data/dto/receive/member.dto";
import {Router} from "@angular/router";
import {GenderEnum} from "../../../../shared/enums/gender.enum";
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {ImagesHttpService} from "../../../../data/http/images-http.service";
import {takeUntil} from "rxjs";
import {createNgDestroySubject} from "../../../../shared/utils/create-ng-destroy-subject.fn";

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
	 * The on destroy
	 * @private
	 */
	private readonly onDestroy$ = createNgDestroySubject();

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

	profilePicture: string | null = null;

	ngOnInit() {
		this.imagesHttpService.getImage(this.member.pictures?.profilePicture || '').pipe(
			takeUntil(this.onDestroy$)
		).subscribe({
			next: (img) => {
				if (this.member.pictures) {
					this.profilePicture = this.imagesHttpService.loadUserImage(img);
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
