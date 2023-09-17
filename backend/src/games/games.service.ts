import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GamesService {
    constructor(private prisma: PrismaService) {}

    async create(createGameDto: CreateGameDto) {
        const game = await this.prisma.game.create({
            data: {
                home_team_id: createGameDto.homeTeamId,
                home_team_name: createGameDto.homeTeamName,
                away_team_id: createGameDto.awayTeamId,
                away_team_name: createGameDto.awayTeamName,
                api_game_id: createGameDto.apiGameId,
                betsPool: { connect: { id: createGameDto.betsPoolId } },
                ...createGameDto,
            },
        });

        return game;
    }

    findAll() {
        return `This action returns all games`;
    }

    findOne(id: number) {
        return `This action returns a #${id} game`;
    }

    update(id: number, updateGameDto: UpdateGameDto) {
        return `This action updates a #${id} game`;
    }

    remove(id: number) {
        return `This action removes a #${id} game`;
    }
}
