import {Component, inject, OnInit} from '@angular/core';
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {ActivatedRoute} from "@angular/router";
import {ChatService} from "../../../shared/services/chat.service";
import {FormControl} from "@angular/forms";
import {createNgDestroySubject} from "../../../shared/utils/create-ng-destroy-subject.fn";
import {SocketService} from "../../../shared/services/socket.service";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MessageInputComponent} from "./message-input/message-input.component";
import {MessageListComponent} from "./message-list/message-list.component";
import {UsersListComponent} from "./users-list/users-list.component";

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [
		MatDrawerContainer,
		MatDrawer,
		MatIcon,
		MatNavList,
		MatListItem,
		MessageInputComponent,
		MessageListComponent,
		UsersListComponent
	],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.scss'
})
export class ChatComponent {

	showFiller = false;


}
