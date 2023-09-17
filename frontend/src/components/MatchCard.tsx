import React from "react";

interface Prop {
    match: {
        id?: number;
        utcDate?: string;
        homeTeam?: any;
        awayTeam?: any;
        score?: any;
    };
}

// Cria cards com o conteudo de uma partida resumido
export const MatchCard: React.FC<Prop> = (prop) => {
    const match = prop.match;
    const homeGoals: number = match.score.fullTime.home;
    const awayGoals: number = match.score.fullTime.away;

    return (
        <ul>
            <hr />
            <li>{match.utcDate}</li>
            <li>
                {homeGoals} - {match.homeTeam.name}
            </li>
            <li>
                {awayGoals} - {match.awayTeam.name}
            </li>
        </ul>
    );
};
