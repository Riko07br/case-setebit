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
import { BetsService } from "./bets.service";
import { CreateBetDto } from "./dto/create-bet.dto";
import { UpdateBetDto } from "./dto/update-bet.dto";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";

@UseGuards(JwtGuard)
@Controller("bets")
export class BetsController {
    constructor(private readonly betsService: BetsService) {}

    @Post()
    create(@Body() createBetDto: CreateBetDto, @GetUser("id") userId) {
        return this.betsService.create(createBetDto, userId);
    }

    @Get()
    findAll(@Body() bets_pool_id: number, @GetUser("id") userId) {
        return this.betsService.findAll(bets_pool_id, userId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.betsService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateBetDto: UpdateBetDto) {
        return this.betsService.update(+id, updateBetDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.betsService.remove(+id);
    }
}
