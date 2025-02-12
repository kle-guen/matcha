import {locationInterface} from "../../../shared/interfaces/location.interface";
import {GenderEnum} from "../../../shared/enums/gender.enum";
import {SexualPreferenceEnum} from "../../../shared/enums/sexual-preference.enum";

export interface ProfileUpdateDto {
	/**
	 * The date of birth of the user.
	 */
	birthdate: Date | null;

	/**
	 * The sexual orientation of the user.
	 */
	sexualPreference: SexualPreferenceEnum | null;

	/**
	 * The gender
	 */
	gender: GenderEnum | null;

	/**
	 * The description of the user.
	 */
	description: string;

	/**
	 * The interests of the user.
	 */
	interests: string[];

	/**
	 * The location of the user
	 */
	location: locationInterface;
}