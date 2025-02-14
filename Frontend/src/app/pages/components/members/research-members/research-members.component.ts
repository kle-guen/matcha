import {Component, inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MemberCardComponent} from "../member-card/member-card.component";
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from "@angular/material/slider";
import {FormFieldComponent} from "../../../../ui/components/form-field/form-field.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../../../ui/components/button/button.component";
import {MatLabel} from "@angular/material/form-field";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {MemberDto} from "../../../../data/dto/receive/member.dto";
import {ResearchMembersDto} from "../../../../data/dto/send/research-members.dto";
import {Observable, takeUntil} from "rxjs";
import {createNgDestroySubject} from "../../../../shared/utils/create-ng-destroy-subject.fn";
import {MembersHttpService} from "../../../../data/http/members-http.service";
import {ActivatedRoute} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {InterestDto} from "../../../../data/dto/receive/interest.dto";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {SortResearchMembersEnum} from "../../../../shared/enums/sort-research-members.enum";
import {FooterService} from "../../../../shared/services/footer.service";
import {FooterComponent} from "../../../../parts/footer/footer.component";

@Component({
	selector: 'app-research-members',
	standalone: true,
	imports: [
		MemberCardComponent,
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
		MatChipOption,
		MatChipListbox,
		FooterComponent,
	],
	templateUrl: './research-members.component.html',
	styleUrl: './research-members.component.scss',
	encapsulation: ViewEncapsulation.None //TODO: Check if this is necessary
})
export class ResearchMembersComponent implements OnInit, OnDestroy {

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
	 * The footer service.
	 * @private
	 */
	private readonly footerService = inject(FooterService);

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
	interests: InterestDto[] = [];

	/**
	 * The users.
	 */
	members: MemberDto[] = [];

	/**
	 * The last research.
	 */
	lastResearch: ResearchMembersDto | null = null;

	/**
	 * The sort by.
	 */
	sortBy: SortResearchMembersEnum | null = null;

	/**
	 * The on init.
	 */
	ngOnInit() {
		this.interests = this.activatedRoute.snapshot.data['interests'];
		this.members = this.activatedRoute.snapshot.data['members'];
		this.footerService.setFooterVisibility(false);
	}

	/**
	 * The submit method.
	 */
	submit() {
		this.lastResearch = this.researchFormGroup.value as ResearchMembersDto;
		this.researchMembers();
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
	researchMembers() {
		let memberSubject: Observable<MemberDto[]>;
		if (!this.lastResearch) {
			memberSubject = this.usersHttpService.suggestMembers(this.sortBy);
		} else {
			memberSubject = this.usersHttpService.researchMembers(this.lastResearch, this.sortBy)
		}
		memberSubject.pipe(
			takeUntil(this.ngDestroy$)
		).subscribe(res => this.members = res);
	}

	sortList(sortBy: SortResearchMembersEnum) {
		if (this.sortBy === sortBy) {
			this.sortBy = null;
		} else {
			this.sortBy = sortBy;
		}

		this.researchMembers();
	}

	protected readonly SortResearchMembersEnum = SortResearchMembersEnum;

	ngOnDestroy(): void {
		this.footerService.setFooterVisibility(true);
	}
}
