import { UserCompleteDto } from '../send/user-complete.dto';

/**
 * The profile data transfer object received by the client.
 */
export class ProfileDto extends UserCompleteDto {

	/**
	 * The name of the user.
	 */
	name!: string;

	/**
	 * The first name of the user.
	 */
	firstName!: string;

	/**
	 * The username of the user.
	 */
	username!: string;

	/**
	 * The email of the user.
	 */
	email!: string;
}