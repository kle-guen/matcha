/**
 * The user complete dto class.
 */
export class UserCompleteDto {

	/**
	 * The profile picture of the user.
	 */
	profilePicture: string = '';

	/**
	 * The first additional picture of the user.
	 */
	firstAdditionalPicture: string = '';

	/**
	 * The second additional picture of the user.
	 */
	secondAdditionalPicture: string = '';

	/**
	 * The third additional picture of the user.
	 */
	thirdAdditionalPicture: string = '';

	/**
	 * The fourth additional picture of the user.
	 */
	fourthAdditionalPicture: string = '';

	/**
	 * The date of birth of the user.
	 */
	birthDate: Date = new Date();

	/**
	 * The gender of the user.
	 */
	gender: string = '';

	/**
	 * The sexual orientation of the user.
	 */
	sexualOrientation: string = '';

	/**
	 * The description of the user.
	 */
	description: string = '';

	/**
	 * The interests of the user.
	 */
	interests: string[] = [];

	/**
	 * The localisation of the user
	 */
	localisation: string = '';
}