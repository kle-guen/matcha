import {Component, inject, OnInit} from '@angular/core';
import {UserDto} from "../../../../data/dto/receive/user.dto";
import {MatCardImage} from "@angular/material/card";
import {ActivatedRoute} from "@angular/router";
import {UsersHttpService} from "../../../../data/http/users-http.service";
import {NgOptimizedImage} from "@angular/common";
import {createNgDestroySubject} from "../../../../shared/utils/create-ng-destroy-subject.fn";
import {takeUntil} from "rxjs";
import {ButtonComponent} from "../../../../ui/components/button/button.component";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {UserCompleteDto} from "../../../../data/dto/receive/user-complete.dto";

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
	templateUrl: './user-page.component.html',
	styleUrl: './user-page.component.scss'
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
	activatedRoute = inject(ActivatedRoute)

	/**
	 * The users http service.
	 * @private
	 */
	usersHttpService = inject(UsersHttpService)

	/**
	 * The user.
	 */
	user!: UserCompleteDto;

	/**
	 * The on init
	 */
	ngOnInit() {
		this.usersHttpService.getUserById(this.activatedRoute.snapshot.params['id']).pipe(
			takeUntil(this.ngDestroy$)
		).subscribe((res) => this.user = res)
	}
}
