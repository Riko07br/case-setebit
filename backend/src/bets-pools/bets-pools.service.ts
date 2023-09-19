import { Injectable } from "@nestjs/common";
import { CreateBetsPoolDto } from "./dto/create-bets-pool.dto";
import { UpdateBetsPoolDto } from "./dto/update-bets-pool.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BetsPoolsService {
    constructor(private prisma: PrismaService) {}

    async create(userId: number, createBetsPoolDto: CreateBetsPoolDto) {
        let betsPool = await this.prisma.betsPool.create({
            data: {
                creator_id: userId,
                name: createBetsPoolDto.name,
                ...createBetsPoolDto,
            },
            include: {
                users: true,
            },
        });

        await this.prisma.betsPoolsOnUsers.create({
            data: {
                user_id: userId,
                bets_pool_id: betsPool.id,
            },
        });

        betsPool = await this.prisma.betsPool.findUnique({
            where: {
                id: betsPool.id,
            },
            include: {
                users: true,
            },
        });

        return betsPool;
    }

    async findAll(userId: number) {
        const betsPools = await this.prisma.betsPool.findMany({
            include: {
                users: { where: { user_id: userId }, include: { user: true } },
                games: true,
                bets: { include: { game: true } },
            },
        });

        return betsPools;
    }

    async findOne(id: number) {
        const betsPool = await this.prisma.betsPool.findUnique({
            where: {
                id: id,
            },
            include: {
                games: true,
                bets: true,
            },
        });

        return betsPool;
    }

    update(id: number, updateBetsPoolDto: UpdateBetsPoolDto) {
        return `This action updates a #${id} betsPool`;
    }

    remove(id: number) {
        return `This action removes a #${id} betsPool`;
    }
}
