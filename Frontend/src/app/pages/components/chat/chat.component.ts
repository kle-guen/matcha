import {Component, inject, OnInit} from '@angular/core';
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {SocketService} from "../../../shared/services/socket.service";
import {MessageDto} from "../../../data/dto/receive/message.dto";
import {ActivatedRoute} from "@angular/router";
import {MessagesService} from "../../../shared/services/messages.service";
import {FormControl} from "@angular/forms";
import {createNgDestroySubject} from "../../../shared/utils/create-ng-destroy-subject.fn";
import {takeUntil} from "rxjs";

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [
		MatDrawerContainer,
		MatDrawer
	],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

	/**
	 * The on destroy.
	 * @private
	 */
	private readonly onDestroy$ = createNgDestroySubject();

	/**
	 * The activated route.
	 * @private
	 */
	private readonly activatedRoute = inject(ActivatedRoute)

	// /**
	//  * The socket service.
	//  * @private
	//  */
	// private readonly socketService = inject(SocketService);

	/**
	 * The messages service.
	 * @private
	 */
	private readonly messagesService = inject(MessagesService);

	/**
	 * The form message.
	 */
	formMessage = new FormControl<string>('');

	/**
	 * The on init.
	 */
	ngOnInit() {
		// this.activatedRoute.snapshot.data['messages']?.forEach((message: MessageDto) => this.messagesService.add(message.user, message));
		//
		// this.socketService.listen('message').pipe(
		// 	takeUntil(this.onDestroy$)
		// ).subscribe((message: MessageDto) => {
		// 	this.messagesService.add(message.user, message);
		// });
	}

	/**
	 * Send a message.
	 * @param id The id of the user to send the message to.
	 */
	// sendMessage(id: number) {
	// 	this.socketService.emit('message', {
	// 		user: id,
	// 		message: this.formMessage.value
	// 	});
	//
	// 	this.formMessage.reset();
	// }

}
