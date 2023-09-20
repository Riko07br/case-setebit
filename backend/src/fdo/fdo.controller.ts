import { Controller, Get, Param, Query } from "@nestjs/common";
import { FdoService } from "./fdo.service";

@Controller("fdo")
export class FdoController {
    constructor(private readonly fdoService: FdoService) {}

    @Get("competitions")
    async getCompetitions() {
        return await this.fdoService.getCompetitions();
    }

    @Get("matches?")
    async getMatches(
        @Query("competition") competitionId: number,
        @Query("year") year: number
    ) {
        //Pega o ano atual como default
        console.log("control year:" + year);
        if (year == undefined || year < 0) year = new Date().getFullYear();

        return await this.fdoService.getMatches(competitionId, year);
    }

    @Get("results/:id")
    async getMatchesInBetsPool(@Param("id") betsPoolId: string) {
        return await this.fdoService.getMatchesInBetsPool(+betsPoolId);
    }
}
