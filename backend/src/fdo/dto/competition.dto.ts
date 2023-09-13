import { AreaDto } from "./area.dto";

export class CompetitionDto {
    id: number;
    area: AreaDto;
    name: string;
    code: string;
    type: string;
    emblem: string;
    plan: string;
    currentSeason: {
        id: number;
        startDate: string;
        endDate: string;
        currentMatchday: number;
        winner: string;
    };
    numberOfAvailableSeasons: number;
    lastUpdated: string;
}
