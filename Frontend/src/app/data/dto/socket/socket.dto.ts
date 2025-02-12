import {TypeNotificationEnum} from "../../../shared/enums/type-notification.enum";
import {TypeSocketEnum} from "../../../shared/enums/type-socket.enum";
import {ChatDto} from "./chat.dto";
import {NotificationDto} from "./notification.dto";

export class SocketDto {
	type!: TypeSocketEnum;
	data!: ChatDto | NotificationDto;
}

