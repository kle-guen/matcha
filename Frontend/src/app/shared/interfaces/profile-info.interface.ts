import {locationInterface} from "./location.interface";
import {InterestDto} from "../../data/dto/receive/interest.dto";
import {GenderEnum} from "../enums/gender.enum";
import {SexualPreferenceEnum} from "../enums/SexualPreference.enum";

export interface profileInfoInterface {
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
	interests: InterestDto[];

	/**
	 * The location of the user
	 */
	location: locationInterface;
}