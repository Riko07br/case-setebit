import React from "react";

// Cria cards com o conteudo de uma partida resumido
export const MatchCard = ({
    match: { id, utcDate, homeTeam, awayTeam, score },
}) => {
    console.log(id);

    const homeGoals: number = score.fullTime.home;
    const awayGoals: number = score.fullTime.away;

    return (
        <ul>
            <hr />
            <li>{utcDate}</li>
            <li>
                {homeGoals} - {homeTeam.name}
            </li>
            <li>
                {awayGoals} - {awayTeam.name}
            </li>
        </ul>
    );
};
