import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateGameDto {
    @IsInt()
    betsPoolId: number;

    @IsNotEmpty()
    @IsInt()
    homeTeamId: number;

    @IsString()
    homeTeamName: string;

    @IsNotEmpty()
    @IsInt()
    awayTeamId: number;

    @IsString()
    awayTeamName: string;

    @IsNotEmpty()
    @IsInt()
    apiGameId: number;
}
