/**
 * The dto for the research members request
 */
export class ResearchMembersDto {

	/**
	 * The number of the page.
	 */
	page?: number;

	/**
	 * The min age of the members.
	 */
	ageMin?: number;

	/**
	 * The max age of the members.
	 */
	ageMax?: number;

	/**
	 * The min fame rating of the members.
	 */
	fameRatingMin?: number;

	/**
	 * The max distance of the members.
	 */
	distanceMax?: number;

	/**
	 * The interests of the members.
	 */
	interests?: string[];
}