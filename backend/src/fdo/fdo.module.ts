import { Module } from "@nestjs/common";
import { FdoService } from "./fdo.service";
import { FdoController } from "./fdo.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule, FdoModule],
    providers: [FdoService],
    controllers: [FdoController],
})
export class FdoModule {}
