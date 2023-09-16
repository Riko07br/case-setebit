import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { CompetitionDto } from "./dto/competition.dto";

@Injectable()
export class FdoService {
    constructor(private readonly httpService: HttpService) {}

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
}

const testData = [
    {
        id: 2013,
        name: "Campeonato Brasileiro Série A",
    },
    {
        id: 2021,
        name: "Premier League",
    },
    {
        id: 2001,
        name: "UEFA Champions League",
    },
    {
        id: 2018,
        name: "European Championship",
    },
    {
        id: 2015,
        name: "Ligue 1",
    },
    {
        id: 2002,
        name: "Bundesliga",
    },
    {
        id: 2019,
        name: "Serie A",
    },
];
