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
                this.httpService.get(process.env.FDO_API_URL + "competitions", {
                    headers: {
                        "X-Auth-Token": process.env.FDO_API_TOK,
                    },
                })
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

    async getCompetitionSeasons(id: number) {
        console.log(id);
        return new Promise((resolve, reject) => {
            firstValueFrom(
                this.httpService.get(
                    process.env.FDO_API_URL + "/competitions/" + id,
                    {
                        headers: {
                            "X-Auth-Token": process.env.FDO_API_TOK,
                        },
                    }
                )
            )
                .then((response) => {
                    resolve(response.data.seasons);
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
        id: 2016,
        name: "Championship",
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
    {
        id: 2003,
        name: "Eredivisie",
    },
    {
        id: 2017,
        name: "Primeira Liga",
    },
    {
        id: 2152,
        name: "Copa Libertadores",
    },
    {
        id: 2014,
        name: "Primera Division",
    },
    {
        id: 2000,
        name: "FIFA World Cup",
    },
];
