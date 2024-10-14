import {ReferentielDto} from "./referentiel-dto";
import {UserDto} from "./user.dto";

/**
 * The user complete dto class.
 */
export class UserCompleteDto extends UserDto {

	city!: string;

	sexuality!: string;

	interests!: ReferentielDto[];

}