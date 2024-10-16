import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UserCardComponent} from "../../../../ui/components/user-card/user-card.component";
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from "@angular/material/slider";
import {FormFieldComponent} from "../../../../ui/components/form-field/form-field.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../../../ui/components/button/button.component";
import {MatLabel} from "@angular/material/form-field";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {MemberDto} from "../../../../data/dto/receive/member.dto";
import {ResearchMembersDto} from "../../../../data/dto/send/research-members.dto";
import {takeUntil} from "rxjs";
import {createNgDestroySubject} from "../../../../shared/utils/create-ng-destroy-subject.fn";
import {MembersHttpService} from "../../../../data/http/members-http.service";
import {ActivatedRoute} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {ReferentielDto} from "../../../../data/dto/receive/referentiel.dto";

@Component({
	selector: 'app-research-members',
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
	templateUrl: './research-members.component.html',
	styleUrl: './research-members.component.scss',
	encapsulation: ViewEncapsulation.None //TODO: Check if this is necessary
})
export class ResearchMembersComponent implements OnInit {

	/**
	 * The ng destroy subject.
	 * @private
	 */
	private readonly ngDestroy$ = createNgDestroySubject();

	/**
	 * The users http service.
	 * @private
	 */
	private readonly usersHttpService = inject(MembersHttpService);

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
	users: MemberDto[] = [];

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
		this.researchUsers(this.researchFormGroup.value as ResearchMembersDto);
	}

	/**
	 * The reset method.
	 */
	reset() {
		this.researchFormGroup.reset();
	}

	/**
	 * The research users method.
	 * @param researchUsers
	 */
	researchUsers(researchUsers: ResearchMembersDto) {
		this.usersHttpService.researchMembers(researchUsers).pipe(
			takeUntil(this.ngDestroy$)
		).subscribe(res => this.users = res);
	}
}
