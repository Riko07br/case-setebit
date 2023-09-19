import { IsInt } from "class-validator";

export class CreateBetDto {
    @IsInt()
    betsPoolId: number;
    @IsInt()
    gameId: number;
    @IsInt()
    home_goals: number;
    @IsInt()
    away_goals: number;
}
