export class UserUpdateDto {
	/**
	 * The first name of the user.
	 */
	firstName!: string | null;

	/**
	 * The last name of the user.
	 */
	lastName!: string | null;

	/**
	 * The username of the user.
	 */
	username!: string | null;

	/**
	 * The email of the user.
	 */
	email!: string | null;
}