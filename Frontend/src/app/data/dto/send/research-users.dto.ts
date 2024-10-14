/**
 * The dto for the research users request
 */
export class ResearchUsersDto {

	/**
	 * The min age of the users.
	 */
	ageMin?: number;

	/**
	 * The max age of the users.
	 */
	ageMax?: number;

	/**
	 * The min fame rating of the users.
	 */
	fameRatingMin?: number;

	/**
	 * The max distance of the users.
	 */
	distanceMax?: number;

	/**
	 * The interests of the users.
	 */
	interests?: string[];
}