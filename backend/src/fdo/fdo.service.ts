import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { AreaDto } from "./dto";

@Injectable()
export class FdoService {
    constructor(private readonly httpService: HttpService) {}

    async getTestCall() {
        const url = process.env.FDO_API_URL + "areas";
        const response = await firstValueFrom(this.httpService.get(url));
        console.log(response.data.areas as Array<AreaDto>);
        return "ok";
    }
}
