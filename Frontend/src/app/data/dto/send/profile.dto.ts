import {PictureDto} from "./picture.dto";
import {profileInfoInterface} from "../../../shared/interfaces/profile-info.interface";
import {UserInfoInterface} from "../../../shared/interfaces/user-info.interface";

/**
 * Data transfer object for sending the profile of the user.
 */
export class ProfileDto {

	/**
	 * The user information.
	 */
	userInfo: UserInfoInterface | null = null;

	/**
	 * The profile info of the user.
	 */
	profileInfo: profileInfoInterface | null = null;

	/**
	 * The pictures of the user.
	 */
	pictures: PictureDto[] = [];
}