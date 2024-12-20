import {PictureDto} from "./picture.dto";
import {profileInfoInterface} from "../../../shared/interfaces/profile-info.interface";

/**
 * Data transfer object for sending the profile of the user.
 */
export class ProfileDto {

	/**
	 * The profile picture of the user.
	 */
	profileInfo: profileInfoInterface | null = null;

	/**
	 * The pictures of the user.
	 */
	pictures: PictureDto[] = [];
}