import {UserDto} from "./user.dto";

export class UserPicturesDto {

	/**
	 * The user.
	 */
	user!: UserDto;

	/**
	 * The profile picture.
	 */
	profilePicture!: File

	/**
	 * The picture 1.
	 */
	picture1!: File;

	/**
	 * The picture 2.
	 */
	picture2!: File;

	/**
	 * The picture 3.
	 */
	picture3!: File;

	/**
	 * The picture 4.
	 */
	picture4!: File;
}