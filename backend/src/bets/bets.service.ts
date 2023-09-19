import { Injectable } from "@nestjs/common";
import { CreateBetDto } from "./dto/create-bet.dto";
import { UpdateBetDto } from "./dto/update-bet.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BetsService {
    constructor(private prisma: PrismaService) {}

    async create(createBetDto: CreateBetDto, userId: number) {
        console.log("home " + createBetDto.home_goals);
        console.log("away " + createBetDto.away_goals);
        const bet = await this.prisma.bet.create({
            data: {
                bets_pool_id: createBetDto.betsPoolId,
                game_id: createBetDto.gameId,
                home_goals: createBetDto.home_goals,
                away_goals: createBetDto.away_goals,
                user_id: userId,
            },
            include: {
                game: true,
            },
        });

        return bet;
    }

    async findAll(bets_pool_id: number, userId: number) {
        const bets = await this.prisma.bet.findMany({
            where: {
                bets_pool_id: bets_pool_id,
                user_id: userId,
            },
            include: {
                game: true,
            },
        });

        return bets;
    }

    async findOne(id: number) {
        const bet = await this.prisma.bet.findUnique({
            where: {
                id,
            },
            include: {
                game: true,
            },
        });

        return bet;
    }

    update(id: number, updateBetDto: UpdateBetDto) {
        return `This action updates a #${id} bet`;
    }

    remove(id: number) {
        return `This action removes a #${id} bet`;
    }
}
