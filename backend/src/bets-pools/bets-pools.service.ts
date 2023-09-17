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
        const pivot = await this.prisma.betsPoolsOnUsers.findMany({
            where: {
                user_id: userId,
            },
            include: {
                bets_pool: true,
            },
        });

        let betsPools: Array<any> = [];

        pivot.forEach((e) => {
            betsPools.push(e.bets_pool);
        });

        return betsPools;
    }

    findOne(id: number) {
        return `This action returns a #${id} betsPool`;
    }

    update(id: number, updateBetsPoolDto: UpdateBetsPoolDto) {
        return `This action updates a #${id} betsPool`;
    }

    remove(id: number) {
        return `This action removes a #${id} betsPool`;
    }
}
