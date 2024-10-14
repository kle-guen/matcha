import {Component, inject, OnInit} from '@angular/core';
import {UserResultDto} from "../../../data/dto/receive/user-result.dto";
import {MatCardImage} from "@angular/material/card";
import {ActivatedRoute} from "@angular/router";
import {UsersHttpService} from "../../../data/http/users-http.service";
import {NgOptimizedImage} from "@angular/common";
import {createNgDestroySubject} from "../../../shared/utils/create-ng-destroy-subject.fn";
import {takeUntil} from "rxjs";
import {ButtonComponent} from "../../../ui/components/button/button.component";

@Component({
	selector: 'app-users',
	standalone: true,
	imports: [
		MatCardImage,
		NgOptimizedImage,
		ButtonComponent
	],
	templateUrl: './users.component.html',
	styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

	ngDestroy$ = createNgDestroySubject();

	activatedRoute = inject(ActivatedRoute)

	usersHttpService = inject(UsersHttpService)

	user!: UserResultDto;

	ngOnInit() {
		this.user = history?.state?.['user'];
		if (!this.user) {
			this.usersHttpService.getUserById(this.activatedRoute.snapshot.params['id']).pipe(
				takeUntil(this.ngDestroy$)
			).subscribe(res => this.user = res)
		}

	}
}
