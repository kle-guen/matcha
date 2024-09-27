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
		MatDrawer
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

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

		this.users = [
			{
				id: 1,
				name: 'John Doe',
				age: '25',
				nickname: 'johndoe',
				description: 'Hello, I am John Doe.',
				sexe: 'H'
			},
			{
				id: 2,
				name: 'Jane Doe',
				age: '22',
				nickname: 'janedoe',
				description: 'Hello, I am Jane Doe.',
				sexe: 'F'
			},
			{
				id: 3,
				name: 'Alice',
				age: '21',
				nickname: 'alice',
				description: 'Hello, I am Alice.',
				sexe: 'F'
			},
			{
				id: 4,
				name: 'Bob',
				age: '24',
				nickname: 'bob',
				description: 'Hello, I am Bob.\nI like sports.\nI like music.\nI like movies.\nI like gaming.\nI like cooking.\nI like reading.\nI like traveling.\nI like photography.\nI like fashion.Hello, I am Bob.\nI like sports.\nI like music.\nI like movies.\nI like gaming.\nI like cooking.\nI like reading.\nI like traveling.\nI like photography.\nI like fashion.',
				sexe: 'H'
			}
			]
	}

	submit() {

	}
}
