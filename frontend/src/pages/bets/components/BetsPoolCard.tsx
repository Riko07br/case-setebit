import React, { useEffect, useRef, useState } from "react";
import { BetsList, GameCard } from ".";
import axios from "axios";

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
    const loadedResultsRef = useRef<boolean>(false);
    const [bets, setBets] = useState<Array<any>>([]);
    const [results, setResults] = useState<Array<any>>();

    const handleNewBet = (bet: any) => {
        console.log(bet);
        prop.betsPool.bets.push(bet);
        setBets((oldBets) => [...oldBets, bet]);
    };

    const loadBetsResults = async () => {
        await axios
            .get("/fdo/results/" + prop.betsPool.id)
            .then((response) => {
                loadedResultsRef.current = true;
                setResults(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        loadBetsResults();
    }, []);

    useEffect(() => {
        if (loadedResultsRef.current) {
            setBets(prop.betsPool.bets);
        }
    }, [results]);

    return (
        <>
            <h2> ==Bolão: {prop.betsPool.name}== </h2>
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
                    <BetsList
                        key={prop.betsPool.id}
                        bets={bets}
                        results={results}
                    />
                ) : (
                    <>Apostas ainda não realizadas</>
                )}
            </div>
        </>
    );
};
