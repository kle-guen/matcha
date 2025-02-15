import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";

@Component({
  selector: 'app-users-list',
  standalone: true,
	imports: [
		MatIcon,
		MatListItem,
		MatNavList
	],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
	public users = [
		{
			id: 1,
			username: 'John Doe',
			avatar: 'https://randomuser.me/api',
			status: true
		},
		{
			id: 2,
			username: 'Jane Doe',
			avatar: 'https://randomuser.me/api',
			status: false
		},
		{
			id: 3,
			username: 'John Smith',
			avatar: 'https://randomuser.me/api',
			status: true
		},
		{
			id: 4,
			username: 'Jane Smith',
			avatar: 'https://randomuser.me/api',
			status: false
		}
	];
}
