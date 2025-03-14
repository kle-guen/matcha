import {InterestDto} from "./interest.dto";
import {MemberDto} from "./member.dto";

/**
 * The member complete dto class.
 */
export class MemberCompleteDto extends MemberDto {

	city!: string;

	lookingFor!: string[];

	interests!: InterestDto[];

	liked!: boolean;

	fameRating!: number;

}