import { Injectable } from "@nestjs/common";
import { CreateBetDto } from "./dto/create-bet.dto";
import { UpdateBetDto } from "./dto/update-bet.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BetsService {
    constructor(private prisma: PrismaService) {}

    create(createBetDto: CreateBetDto) {
        return "This action adds a new bet";
    }

    findAll() {
        return `This action returns all bets`;
    }

    findOne(id: number) {
        return `This action returns a #${id} bet`;
    }

    update(id: number, updateBetDto: UpdateBetDto) {
        return `This action updates a #${id} bet`;
    }

    remove(id: number) {
        return `This action removes a #${id} bet`;
    }
}