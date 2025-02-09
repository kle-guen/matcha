import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HistoryDto} from "../../../data/dto/receive/history.dto";
import {MatCard, MatCardAvatar, MatCardContent} from "@angular/material/card";
import {TypeHistoryEnum} from "../../../shared/enums/type-history.enum";
import {MatIcon} from "@angular/material/icon";
import {DatePipe} from "@angular/common";

@Component({
	selector: 'app-history',
	standalone: true,
	imports: [
		MatCard,
		MatCardContent,
		MatIcon,
		MatCardAvatar,
		DatePipe
	],
	templateUrl: './history.component.html',
	styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {

	/**
	 * The activated route.
	 * @private
	 */
	private readonly activatedRoute = inject(ActivatedRoute);

	/**
	 * The history.
	 * @private
	 */
	history: HistoryDto[] = [];

	/**
	 * The on init.
	 */
	ngOnInit() {
		this.history = this.activatedRoute.snapshot.data['history'];
	}

	protected readonly TypeHistoryEnum = TypeHistoryEnum;
}
