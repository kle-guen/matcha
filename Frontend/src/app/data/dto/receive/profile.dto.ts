import {PictureDto} from "../send/picture.dto";
import {GenderEnum} from "../../../shared/enums/gender.enum";
import {SexualPreferenceEnum} from "../../../shared/enums/SexualPreference.enum";
import {InterestDto} from "./interest.dto";

/**
 * The profile data transfer object received by the client.
 */
export class ProfileDto {

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
	 * The user interests.
	 */
	interests!: InterestDto[];

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