import {Component, inject, OnInit} from '@angular/core';
import {MatCardImage, MatCardModule} from "@angular/material/card";
import {ActivatedRoute, Router} from "@angular/router";
import {MembersHttpService} from "../../../../data/http/members-http.service";
import {DatePipe, NgClass, NgOptimizedImage} from "@angular/common";
import {createNgDestroySubject} from "../../../../shared/utils/create-ng-destroy-subject.fn";
import {takeUntil} from "rxjs";
import {ButtonComponent} from "../../../../ui/components/button/button.component";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MemberCompleteDto} from "../../../../data/dto/receive/member-complete.dto";
import {MatIcon} from "@angular/material/icon";
import {GenderEnum} from "../../../../shared/enums/gender.enum";
import {ImagesHttpService} from "../../../../data/http/images-http.service";
import {ConnectionService} from "../../../../shared/services/connection.service";

@Component({
	selector: 'app-member-profile',
	standalone: true,
	imports: [
		MatCardImage,
		NgOptimizedImage,
		ButtonComponent,
		MatChipSet,
		MatChip,
		MatCardModule,
		MatIcon,
		NgClass,
		DatePipe
	],
	templateUrl: './member-profile.component.html',
	styleUrl: './member-profile.component.scss'
})
export class MemberProfile implements OnInit {

	/**
	 * The on destroy
	 * @private
	 */
	private readonly onDestroy$ = createNgDestroySubject();

	/**
	 * The ng destroy subject.
	 * @private
	 */
	private readonly ngDestroy$ = createNgDestroySubject();

	/**
	 * The activated route.
	 * @private
	 */
	private readonly activatedRoute = inject(ActivatedRoute);

	/**
	 * The router.
	 * @private
	 */
	private readonly route = inject(Router);

	/**
	 * The users http service.
	 * @private
	 */
	private readonly membersHttpService = inject(MembersHttpService);

	/**
	 * The connection service.
	 * @private
	 */
	private connectionService = inject(ConnectionService);

	/**
	 * The gender enum.
	 * @protected
	 */
	protected readonly GenderEnum = GenderEnum;

	/**
	 * The user.
	 */
	member!: MemberCompleteDto;

	/**
	 * The images http service.
	 * @private
	 */
	private readonly imagesHttpService = inject(ImagesHttpService);

	picturesUrl: string[] = [];

	indexImg = 0;

	isConnected = false;

	/**
	 * The on init.
	 */
	ngOnInit() {
		this.member = this.activatedRoute.snapshot.data['member'];

		this.connectionService.connectedMembers$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(ids => {
			this.isConnected = ids.includes(this.member.id);
		});

		let picturesUrlTmp: (string | null | undefined)[] = [];

		picturesUrlTmp.push(this.member.pictures?.profilePicture);
		picturesUrlTmp.push(this.member.pictures?.picture1);
		picturesUrlTmp.push(this.member.pictures?.picture2);
		picturesUrlTmp.push(this.member.pictures?.picture3);
		picturesUrlTmp.push(this.member.pictures?.picture4);

		picturesUrlTmp = picturesUrlTmp.filter((url) => url !== null && url !== undefined);

		picturesUrlTmp.forEach((imgName) => {
			this.imagesHttpService.getImage(imgName || '').pipe(
				takeUntil(this.onDestroy$)
			).subscribe({
				next: (img) => {
					this.picturesUrl.push(this.imagesHttpService.loadUserImage(img));
				},
			});
		});
	}

	/**
	 * Send a like.
	 */
	sendLike() {
		this.membersHttpService.likeMemberById(this.member.id).pipe(
			takeUntil(this.ngDestroy$)
		).subscribe({
			next: () => this.member.liked = !this.member.liked
		})
	}

	/**
	 * Block a member.
	 */
	blockMember() {
		this.membersHttpService.blockMemberById(this.member.id).pipe(
			takeUntil(this.ngDestroy$)
		).subscribe({
			next: () => this.route.navigate(['members'])
		})
	}

	/**
	 * Report a member.
	 */
	reportMember() {
		this.membersHttpService.reportMemberById(this.member.id).pipe(
			takeUntil(this.ngDestroy$)
		).subscribe();
		this.blockMember();
	}

	nextImg() {
		this.indexImg++;
		if (this.indexImg >= this.picturesUrl.length) {
			this.indexImg = 0;
		}
	}
}