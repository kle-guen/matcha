import {Component, inject, OnInit} from '@angular/core';
import {MatCardImage} from "@angular/material/card";
import {ActivatedRoute} from "@angular/router";
import {MembersHttpService} from "../../../../data/http/members-http.service";
import {NgOptimizedImage} from "@angular/common";
import {createNgDestroySubject} from "../../../../shared/utils/create-ng-destroy-subject.fn";
import {takeUntil} from "rxjs";
import {ButtonComponent} from "../../../../ui/components/button/button.component";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MemberCompleteDto} from "../../../../data/dto/receive/member-complete.dto";

@Component({
	selector: 'app-user-page',
	standalone: true,
	imports: [
		MatCardImage,
		NgOptimizedImage,
		ButtonComponent,
		MatChipSet,
		MatChip
	],
	templateUrl: './member-page.component.html',
	styleUrl: './member-page.component.scss'
})
export class UserPage implements OnInit {

	/**
	 * The ng destroy subject.
	 * @private
	 */
	ngDestroy$ = createNgDestroySubject();

	/**
	 * The activated route.
	 * @private
	 */
	private readonly activatedRoute = inject(ActivatedRoute)

	/**
	 * The users http service.
	 * @private
	 */
	private readonly usersHttpService = inject(MembersHttpService)

	/**
	 * The user.
	 */
	user!: MemberCompleteDto;

	/**
	 * The on init.
	 */
	ngOnInit() {
		this.usersHttpService.getMemberById(this.activatedRoute.snapshot.params['id']).pipe(
			takeUntil(this.ngDestroy$)
		).subscribe((res) => this.user = res)
	}
}
