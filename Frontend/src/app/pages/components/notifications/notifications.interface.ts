/**
 * Interface to display notifications
 */
export interface NotificationsInterface {
	/**
	 * The username of the user who sent the notification.
	 */
	username: string;

	/**
	 * The type of the notification.
	 */
	type: string;

	/**
	 * The date of the notification.
	 */
	date: Date;

	/**
	 * The label of the notification.
	 */
	label: string;

	/**
	 * The icon of the notification.
	 */
	icon: string;

	/**
	 * The color of the notification.
	 */
	color: string;

	/**
	 * If the notification has been read.
	 */
	isRead: boolean;
}