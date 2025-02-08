import {ProfileDto} from "./profile.dto";

export class UserDto {
	/**
	 * The user id.
	 */
	userId!: number;

	/**
	 * The username.
	 */
	username!: string;

	/**
	 * The email.
	 */
	email!: string;

	/**
	 * The first name.
	 */
	firstName!: string;

	/**
	 * The last name.
	 */
	lastName!: string;

	/**
	 * The user profile.
	 */
	profile!: ProfileDto;
}