import {PictureDto} from "../send/picture.dto";
import {GenderEnum} from "../../../shared/enums/gender.enum";
import {SexualPreferenceEnum} from "../../../shared/enums/SexualPreference.enum";

/**
 * The profile data transfer object received by the client.
 */
export class ProfileDto {

	/**
	 * The user first name.
	 */
	firstName!: string;

	/**
	 * The user last name.
	 */
	lastName!: string;

	/**
	 * The username of the user.
	 */
	username!: string;

	/**
	 * The email of the user.
	 */
	email!: string;

	/**
	 * The user id.
	 */
	userId!: number;

	/**
	 * The gender
	 */
	gender!: GenderEnum;

	/**
	 * The sexual orientation of the user.
	 */
	sexualPreference!: SexualPreferenceEnum;

	/**
	 * The description of the user
	 */
	description!: string;

	/**
	 * The latitude
	 */
	latitude!: number;

	/**
	 * The longitude
	 */
	longitude!: number;

	/**
	 * The city
	 */
	city!: string;

	/**
	 * The fame rating
	 */
	fameRating!: number;

	/**
	 * The date of birth of the user.
	 */
	birthdate!: Date;

	/**
	 * The pictures of the user.
	 */
	pictures: PictureDto[] = [];
}