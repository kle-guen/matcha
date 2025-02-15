import {TypeNotificationEnum} from "../../../shared/enums/type-notification.enum";

export class NotificationDto {
	type!: TypeNotificationEnum;
	date!: Date;
	username!: string;
	isRead!: boolean;
}