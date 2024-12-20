/**
 * Data transfer object for sending pictures.
 */
export class PictureDto {

	/**
	 * The file of the picture.
	 */
	file: File | null = null;

	/**
	 * Boolean to check if the picture is a profile picture
	 */
	isProfilePicture: boolean = false;
}