import {ReferentielDto} from "./referentiel.dto";
import {MemberDto} from "./member.dto";

/**
 * The member complete dto class.
 */
export class MemberCompleteDto extends MemberDto {

	city!: string;

	sexuality!: string;

	interests!: ReferentielDto[];

}