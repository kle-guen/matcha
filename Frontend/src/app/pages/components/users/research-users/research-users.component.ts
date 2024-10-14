import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UserCardComponent} from "../../../../ui/components/user-card/user-card.component";
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from "@angular/material/slider";
import {FormFieldComponent} from "../../../../ui/components/form-field/form-field.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../../../ui/components/button/button.component";
import {MatLabel} from "@angular/material/form-field";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {UserDto} from "../../../../data/dto/receive/user.dto";
import {ResearchUsersDto} from "../../../../data/dto/send/research-users.dto";
import {takeUntil} from "rxjs";
import {createNgDestroySubject} from "../../../../shared/utils/create-ng-destroy-subject.fn";
import {UsersHttpService} from "../../../../data/http/users-http.service";
import {ActivatedRoute} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {ReferentielDto} from "../../../../data/dto/receive/referentiel-dto";

@Component({
	selector: 'app-research-users',
	standalone: true,
	imports: [
		UserCardComponent,
		MatSlider,
		MatSliderRangeThumb,
		MatSliderThumb,
		FormFieldComponent,
		ReactiveFormsModule,
		ButtonComponent,
		MatLabel,
		MatDrawerContainer,
		MatButton,
		MatDrawer,
		MatIcon,
	],
	templateUrl: './research-users.component.html',
	styleUrl: './research-users.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class ResearchUsersComponent implements OnInit {

	/**
	 * The ng destroy subject.
	 * @private
	 */
	private readonly ngDestroy$ = createNgDestroySubject();

	/**
	 * The users http service.
	 * @private
	 */
	private readonly usersHttpService = inject(UsersHttpService);

	/**
	 * The activated route.
	 * @private
	 */
	private readonly activatedRoute = inject(ActivatedRoute);

	/**
	 * The form builder.
	 * @private
	 */
	private readonly formBuilder = inject(FormBuilder);

	/**
	 * The research form group.
	 */
	researchFormGroup = this.formBuilder.group({
		ageMin: [18],
		ageMax: [99],
		fameRatingMin: [0],
		distanceMax: [1],
		interests: [[] as string[]],
	});

	/**
	 * The interests.
	 */
	interests: ReferentielDto[] = [];

	/**
	 * The users.
	 */
	users: UserDto[] = [];

	/**
	 * The on init.
	 */
	ngOnInit() {
		this.interests = [
			{value: 'sports', label: 'Sports'},
			{value: 'music', label: 'Music'},
			{value: 'movies', label: 'Movies'},
			{value: 'gaming', label: 'Gaming'},
			{value: 'cooking', label: 'Cooking'},
			{value: 'reading', label: 'Reading'},
			{value: 'traveling', label: 'Traveling'},
			{value: 'photography', label: 'Photography'},
			{value: 'fashion', label: 'Fashion'}
		]
		this.users = this.activatedRoute.snapshot.data['users'];
	}

	/**
	 * The submit method.
	 */
	submit() {
		this.researchUsers(this.researchFormGroup.value as ResearchUsersDto);
	}

	/**
	 * The research users method.
	 * @param researchUsers
	 */
	researchUsers(researchUsers: ResearchUsersDto) {
		this.usersHttpService.researchUsers(researchUsers).pipe(
			takeUntil(this.ngDestroy$)
		).subscribe(res => this.users = res);
	}
}
