import { IsString } from "class-validator";

export class CreateBetsPoolDto {
    @IsString()
    name?: string = "Bolão sem nome";
}
