export class MessageDto {
	/**
	 * The id of the message.
	 */
	id!: number;

	/**
	 * The content of the message.
	 */
	content!: string;

	/**
	 * The date the message was sent.
	 */
	date!: Date;

	/**
	 * The user id of the message.
	 */
	user!: number;

	/**
	 * Is the user the message's recipient.
	 */
	isRecipient!: boolean;
}