import React, { useEffect, useState } from "react";
import { BetsList, GameCard } from ".";

interface Prop {
    betsPool: {
        id: string;
        name?: string;
        games: Array<any>;
        bets: Array<any>;
    };
}

// Show bets pools where the user is betting or has created
export const BetsPoolCard: React.FC<Prop> = (prop) => {
    const [bets, setBets] = useState<Array<any>>([]);

    const handleNewBet = (bet: any) => {
        console.log(bet);
        prop.betsPool.bets.push(bet);
        setBets((oldBets) => [...oldBets, bet]);
    };

    useEffect(() => {
        setBets(prop.betsPool.bets);
    }, []);

    return (
        <>
            <p>Bolão: {prop.betsPool.name}</p>
            <div>
                <h3>Jogos:</h3>
                {prop.betsPool.games?.length > 0 ? (
                    prop.betsPool.games.map((g) => (
                        <GameCard
                            key={g.id}
                            game={g}
                            betsPoolId={prop.betsPool.id}
                            newBet={handleNewBet}
                        />
                    ))
                ) : (
                    <>Sem jogos adicionados</>
                )}
            </div>
            <div key={"Bets"}>
                <h3>Apostas:</h3>
                {bets.length > 0 ? (
                    <BetsList key={prop.betsPool.id} bets={bets} />
                ) : (
                    <>Apostas ainda não realizadas</>
                )}
            </div>
        </>
    );
};
