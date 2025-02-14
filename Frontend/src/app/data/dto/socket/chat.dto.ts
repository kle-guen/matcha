export class ChatDto {
	receiverId!: number;
	senderId!: number | null;
	content!: string;
	isRead!: boolean;
	createdAt!: Date;
}