import React, { useEffect, useState } from "react";

interface Prop {
    bets: Array<any>;
    results?: Array<any>;
}

interface BetResult {
    bet: any;
    result?: any;
}

// Show all bets for the bet pool
export const BetsList: React.FC<Prop> = (prop) => {
    const [betsResults, setBetsResults] = useState<Array<BetResult>>([]);

    const handleResultBet = () => {
        let betResultsTmp: Array<BetResult> = [];

        prop.bets.forEach((bet) => {
            const result = prop.results?.find(
                (i) => i.id === bet.game.api_game_id
            );
            betResultsTmp.push({ bet, result });
        });

        setBetsResults(betResultsTmp);
    };

    useEffect(() => {
        handleResultBet();
    }, []);

    return (
        <div>
            {betsResults?.length > 0 ? (
                betsResults.map((betResult) => (
                    <div key={betResult.bet.id}>
                        <p>
                            <b>Times: </b>
                            {betResult.bet.game.home_team_name +
                                " x " +
                                betResult.bet.game.away_team_name}
                        </p>
                        <p>
                            <b>Aposta: </b>
                            {betResult.bet.home_goals +
                                " x " +
                                betResult.bet.home_goals}
                        </p>
                        <p>
                            <b>Resultado: </b>
                            {betResult.result != undefined
                                ? betResult.result.score.fullTime.home +
                                  " x " +
                                  betResult.result.score.fullTime.away
                                : "Sem resultado até o momento"}
                        </p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>Apostas ainda não realizadas</p>
            )}
        </div>
    );
};
