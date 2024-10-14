import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UserCardComponent} from "../../../ui/components/user-card/user-card.component";
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from "@angular/material/slider";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../../ui/components/button/button.component";
import {MatLabel} from "@angular/material/form-field";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {UserResultDto} from "../../../data/dto/receive/user-result.dto";
import {ResearchUsersDto} from "../../../data/dto/send/research-users.dto";
import {takeUntil} from "rxjs";
import {createNgDestroySubject} from "../../../shared/utils/create-ng-destroy-subject.fn";
import {UsersHttpService} from "../../../data/http/users-http.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

@Component({
	selector: 'app-home',
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
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

	private readonly ngDestroy$ = createNgDestroySubject();

	constructor(private readonly usersHttpService: UsersHttpService) {
	}

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly formBuilder = inject(FormBuilder);

	researchFormGroup = this.formBuilder.group({
		ageMin: [18],
		ageMax: [99],
		fameRatingMin: [0],
		distanceMax: [1],
		interests: [[] as string[]],
	});

	interests: { value: any, label: string }[] = [];
	users: UserResultDto[] = [];

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

	submit() {
		this.researchUsers(this.researchFormGroup.value as ResearchUsersDto);
	}

	researchUsers(researchUsers: ResearchUsersDto) {
		this.usersHttpService.researchUsers(researchUsers).pipe(
			takeUntil(this.ngDestroy$)
		).subscribe(res => this.users = res);
	}
}
