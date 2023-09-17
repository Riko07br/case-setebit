import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { BetsPoolsService } from "./bets-pools.service";
import { CreateBetsPoolDto } from "./dto/create-bets-pool.dto";
import { UpdateBetsPoolDto } from "./dto/update-bets-pool.dto";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";

@UseGuards(JwtGuard)
@Controller("bets-pools")
export class BetsPoolsController {
    constructor(private readonly betsPoolsService: BetsPoolsService) {}

    @Post()
    create(
        @GetUser("id") userId: number,
        @Body() createBetsPoolDto: CreateBetsPoolDto
    ) {
        return this.betsPoolsService.create(userId, createBetsPoolDto);
    }

    @Get()
    findAll(@GetUser("id") userId: number) {
        return this.betsPoolsService.findAll(userId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.betsPoolsService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateBetsPoolDto: UpdateBetsPoolDto
    ) {
        return this.betsPoolsService.update(+id, updateBetsPoolDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.betsPoolsService.remove(+id);
    }
}
