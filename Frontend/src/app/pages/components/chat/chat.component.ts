import {
	AfterViewInit,
	Component,
	HostListener,
	inject,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {FormFieldComponent} from "../../../ui/components/form-field/form-field.component";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FooterService} from "../../../shared/services/footer.service";
import {FooterComponent} from "../../../parts/footer/footer.component";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ChatService} from "../../../shared/services/chat-service";
import {MatTooltip} from "@angular/material/tooltip";
import {ChatDto} from "../../../data/dto/socket/chat.dto";
import {NgClass} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {MatchDto} from "../../../data/dto/receive/match.dto";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NotificationsService} from "../../../shared/services/notifications-service";
import {createNgDestroySubject} from "../../../shared/utils/create-ng-destroy-subject.fn";
import {takeUntil} from "rxjs";

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [
		MatDrawerContainer,
		MatDrawer,
		MatIcon,
		MatNavList,
		MatListItem,
		FormFieldComponent,
		FormsModule,
		ReactiveFormsModule,
		FooterComponent,
		MatFormField,
		MatInput,
		MatTooltip,
		NgClass,
		MatCard,
		MatCardContent
	],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {

	/**
	 * The on destroy
	 * @private
	 */
	private readonly onDestroy$ = createNgDestroySubject();

	/**
	 * 	The footer service.
	 * @private
	 */
	private readonly footerService = inject(FooterService);

	/**
	 * The chat service.
	 * @private
	 */
	private readonly chatService = inject(ChatService);

	/**
	 * The notifications service.
	 * @private
	 */
	private readonly notificationsService = inject(NotificationsService);

	/**
	 * The activated route.
	 * @private
	 */
	private readonly activatedRoute = inject(ActivatedRoute);

	/**
	 * The textarea container.
	 */
	@ViewChild('textareaContainer') textareaContainer: any;

	/**
	 * The message control.
	 */
	messageControl = new FormControl<string | null>(null);

	/**
	 * The messages.
	 */
	messages: ChatDto[] = [];

	/**
	 * The matches.
	 */
	matches: MatchDto[] = [];

	/**
	 * The user selected.
	 */
	matchSelected: MatchDto | null = null;

	/**
	 * The on init.
	 */
	ngOnInit(): void {
		this.messageControl.disable();
		this.matches = this.activatedRoute.snapshot.data['matches'];
		this.footerService.setFooterVisibility(false);
		this.chatService.messagesSelected$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(messages => {
			this.messages = messages;
			setTimeout(() => {
				this.textareaContainer.nativeElement.scrollTop = this.textareaContainer.nativeElement.scrollHeight;
			}, 30);
		})
		this.chatService.userSelected$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(userId => {
			this.matchSelected = this.matches.find(match => match.id === userId) || null;
			if (userId) {
				this.messageControl.enable();
			} else {
				this.messageControl.disable();
			}
		});
		this.notificationsService.dislike$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(disliker => {
			if (disliker) {
				this.matches = this.matches.filter(match => match.id !== disliker);
			}
		})
		this.notificationsService.match$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(notification => {
			if (notification && !this.matches.some(match => match.id === notification.userId)) {
				this.matches.push({id: notification.userId, username: notification.username});
			}
		})
	}

	/**
	 * The after view init.
	 */
	ngAfterViewInit() {
		setTimeout(() => {
			this.textareaContainer.nativeElement.scrollTop = this.textareaContainer.nativeElement.scrollHeight;
		}, 30);
	}

	/**
	 * Send a message.
	 */
	sendMessage() {
		if ((this.messageControl.value?.length || 0) > 0 && this.matchSelected?.id) {
			const message: ChatDto = {
				senderId: null,
				receiverId: this.matchSelected.id,
				content: this.messageControl.value!,
				createdAt: new Date(),
				isRead: true,
			}
			this.chatService.sendMessage(message);
			this.messageControl.setValue(null);
		}
		this.adjustTextareaHeight();
	}

	onEnter(event: Event): void {
		event.preventDefault();
		this.sendMessage();
	}

	/**
	 * Select a user.
	 * @param id
	 */
	selectUser(id: number) {
		this.chatService.selectUser(id);
	}

	/**
	 * On input.
	 * @param event
	 */
	onInput(event: Event): void {
		const textarea = event.target as HTMLTextAreaElement;
		const maxLines = 20;

		const lines = textarea.value.split('\n');
		if (lines.length > maxLines) {
			textarea.value = lines.slice(0, maxLines).join('\n');
			this.messageControl.patchValue(textarea.value);
		}

		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;

		this.textareaContainer.nativeElement.scrollTop = this.textareaContainer.nativeElement.scrollHeight;
	}

	/**
	 * Adjust the textarea height.
	 */
	adjustTextareaHeight() {
		const textarea = document.querySelector('textarea') as HTMLTextAreaElement;

		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}

	/**
	 * On resize.
	 * @param event
	 */
	@HostListener('window:resize', ['$event'])
	onResize(event: Event): void {
		this.adjustTextareaHeight();
	}

	/**
	 * On destroy.
	 */
	ngOnDestroy(): void {
		this.footerService.setFooterVisibility(true);
		this.chatService.selectUser(null);
	}

}
