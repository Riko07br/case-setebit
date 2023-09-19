import React from "react";

interface Prop {
    bets: Array<any>;
}

// Show all bets for the bet pool
export const BetsList: React.FC<Prop> = (prop) => {
    return (
        <div>
            {prop.bets?.length > 0 ? (
                prop.bets.map((bet) => (
                    <div key={bet.id}>
                        <p>dia e horario</p>
                        <p>
                            {bet.game.home_team_name}: {bet.home_goals}
                        </p>
                        <p>
                            {bet.game.away_team_name}: {bet.home_goals}
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
