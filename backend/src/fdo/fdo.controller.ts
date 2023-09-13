import { Controller, Get, Param } from "@nestjs/common";
import { FdoService } from "./fdo.service";

@Controller("fdo")
export class FdoController {
    constructor(private readonly fdoService: FdoService) {}

    @Get("competitions")
    async getCompetitions() {
        return await this.fdoService.getCompetitions();
    }

    @Get("competitions/:id")
    async getCompetitionSeasons(@Param("id") id: number) {
        return await this.fdoService.getCompetitionSeasons(id);
    }
}
