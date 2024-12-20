import {profileInfoInterface} from "../../../shared/interfaces/profile-info.interface";
import {PictureDto} from "../send/picture.dto";

/**
 * The profile data transfer object received by the client.
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