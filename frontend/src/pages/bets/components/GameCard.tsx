import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Prop {
    game: any;
    betsPoolId: string;
    newBet: Dispatch<SetStateAction<any>>;
}

// Bets Pool game
export const GameCard: React.FC<Prop> = (prop) => {
    const [betOpen, setBetOpen] = useState(false);
    const [homeGoals, setHomeGoals] = useState<number>(0);
    const [awayGoals, setAwayGoals] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let responseBody = {
            betsPoolId: prop.betsPoolId,
            gameId: prop.game.id,
            home_goals: homeGoals,
            away_goals: awayGoals,
        };

        axios
            .post("/bets", responseBody)
            .then((response) => {
                setBetOpen(false);
                prop.newBet(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function validateInput(input: any) {
        return !isNaN(input) && Number(input) >= 0;
    }

    return (
        <div>
            <p>dia e horario</p>
            {prop.game.home_team_name} x {prop.game.away_team_name}
            <div>
                {betOpen ? (
                    <>
                        <button type="button" onClick={() => setBetOpen(false)}>
                            X
                        </button>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="number"
                                name="home_goals"
                                value={homeGoals}
                                onChange={(e) => {
                                    if (validateInput(e.target.value))
                                        setHomeGoals(Number(e.target.value));
                                    else if (e.target.value == undefined)
                                        setHomeGoals(0);
                                }}
                            />
                            x
                            <input
                                type="number"
                                name="away_goals"
                                value={awayGoals}
                                onChange={(e) => {
                                    if (validateInput(e.target.value))
                                        setAwayGoals(Number(e.target.value));
                                    else if (e.target.value == undefined)
                                        setAwayGoals(0);
                                }}
                            />
                            <button type="submit">Confirmar aposta!</button>
                        </form>
                    </>
                ) : (
                    <button type="button" onClick={() => setBetOpen(true)}>
                        Apostar
                    </button>
                )}
            </div>
            <hr />
        </div>
    );
};
