import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from "@nestjs/common";
import { GamesService } from "./games.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { JwtGuard } from "../auth/guard";

@UseGuards(JwtGuard)
@Controller("games")
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Post()
    async create(@Body() createGameDto: CreateGameDto) {
        return await this.gamesService.create(createGameDto);
    }

    @Get()
    findAll() {
        return this.gamesService.findAll();
    }

    @Get("validate?")
    isInBetPool(
        @Query("api-game-id") apiGameId: string,
        @Query("bets-pool-id") betsPoolId: string
    ) {
        return this.gamesService.isInBetPool(+apiGameId, +betsPoolId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.gamesService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateGameDto: UpdateGameDto) {
        return this.gamesService.update(+id, updateGameDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.gamesService.remove(+id);
    }
}
