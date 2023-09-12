import { Controller, Get } from "@nestjs/common";
import { FdoService } from "./fdo.service";

@Controller("fdo")
export class FdoController {
    constructor(private readonly fdoService: FdoService) {}

    @Get("test")
    getTestCall() {
        return this.fdoService.getTestCall();
    }
}
