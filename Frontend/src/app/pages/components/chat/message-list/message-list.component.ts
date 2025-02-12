import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";

@Component({
  selector: 'app-message-list',
  standalone: true,
	imports: [
		MatIcon,
		MatListItem,
		MatNavList
	],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {

}
