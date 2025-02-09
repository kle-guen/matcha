import {TypeHistoryEnum} from "../../../shared/enums/type-history.enum";

export class HistoryDto {
	type!: TypeHistoryEnum;
	date!: Date;
	user!: string;
}