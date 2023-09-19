import axios from "axios";
import React, { useEffect, useState } from "react";

interface Prop {
    match: {
        id?: number;
        utcDate?: string;
        homeTeam?: any;
        awayTeam?: any;
        score?: any;
        status?: string;
    };
    betsPoolId?: number;
}

// Cria cards com o conteudo de uma partida resumido
export const MatchCard: React.FC<Prop> = (prop) => {
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const match = prop.match;
    const homeGoals: number =
        match.score.fullTime.home == undefined ? 0 : match.score.fullTime.home;
    const awayGoals: number =
        match.score.fullTime.away == undefined ? 0 : match.score.fullTime.away;

    useEffect(() => {
        handleButtonEnable();
    }, []);

    const handleButtonEnable = () => {
        if (match.status === "TIMED") {
            if (prop?.betsPoolId) {
                axios
                    .get(
                        "/games/validate?" +
                            "api-game-id=" +
                            match.id +
                            "&bets-pool-id=" +
                            prop.betsPoolId
                    )
                    .then((response) => {
                        console.log(response.data);
                        if (response.data === false) {
                            setButtonEnabled(true);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    };

    const onGameSubmit = (e: any) => {
        e.preventDefault();

        const responseBody = {
            betsPoolId: prop.betsPoolId,
            homeTeamId: match.homeTeam.id,
            homeTeamName: match.homeTeam.name,
            awayTeamId: match.awayTeam.id,
            awayTeamName: match.awayTeam.name,
            apiGameId: match.id,
        };
        console.log(responseBody);
        axios
            .post("/games", responseBody)
            .then((response) => {
                console.log(response.data);
                setButtonEnabled(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
            <li>
                {buttonEnabled ? (
                    <button type="button" onClick={onGameSubmit}>
                        Adicionar ao bolão
                    </button>
                ) : (
                    <></>
                )}
            </li>
        </ul>
    );
};
