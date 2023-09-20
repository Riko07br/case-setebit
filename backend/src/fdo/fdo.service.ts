import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { CompetitionDto } from "./dto/competition.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FdoService {
    constructor(
        private readonly httpService: HttpService,
        private prisma: PrismaService
    ) {}

    async getCompetitions() {
        return new Promise((resolve, reject) => {
            //resolve(testData);
            firstValueFrom(
                this.httpService.get(
                    process.env.FDO_API_URL + "/competitions",
                    {
                        headers: {
                            "X-Auth-Token": process.env.FDO_API_TOK,
                        },
                    }
                )
            )
                .then((response) => {
                    const data = response.data
                        .competitions as Array<CompetitionDto>;
                    let competitions: Array<{ id: number; name: string }> = [];

                    for (let i = 0; i < data.length; i++) {
                        const c = data[i];

                        if (c.plan == "TIER_ONE")
                            competitions.push({ id: c.id, name: c.name });
                    }

                    resolve(competitions);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    async getMatches(competitionId: number, year: number) {
        return new Promise((resolve, reject) => {
            firstValueFrom(
                this.httpService.get(
                    process.env.FDO_API_URL +
                        "/competitions/" +
                        competitionId +
                        "/matches?season=" +
                        year,
                    {
                        headers: {
                            "X-Auth-Token": process.env.FDO_API_TOK,
                            "X-Unfold-Goals": true,
                        },
                    }
                )
            )
                .then((response) => {
                    resolve(response.data.matches);
                })
                .catch((error) => {
                    console.log(error.message);
                    reject(error);
                });
        });
    }

    async getMatchesInBetsPool(betsPoolId: number) {
        let url = process.env.FDO_API_URL + "/matches/?ids=";

        const betsPool = await this.prisma.betsPool.findUnique({
            where: { id: betsPoolId },
            include: { games: true },
        });

        for (let i = 0; i < betsPool.games.length; i++) {
            const id = betsPool.games[i].api_game_id;
            url += id;
            if (i < id - 1) url += ",";
        }

        console.log(url);
        return new Promise((resolve, reject) => {
            firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        "X-Auth-Token": process.env.FDO_API_TOK,
                    },
                })
            )
                .then((response) => {
                    resolve(response.data.matches);
                })
                .catch((error) => {
                    console.log(error.message);
                    reject(error);
                });
        });
    }
}
