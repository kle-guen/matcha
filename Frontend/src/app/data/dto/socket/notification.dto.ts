import {TypeNotificationEnum} from "../../../shared/enums/type-notification.enum";

export class NotificationDto {
	userId!: number;
	type!: TypeNotificationEnum;
	date!: Date;
	username!: string;
	isRead!: boolean;
}