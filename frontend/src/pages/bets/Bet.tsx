import React, { useEffect, useState } from "react";
import { BetsPoolCard, BetsPoolCreate } from "./components";
import axios from "axios";

export function Bet() {
    const [betsPools, setBetPools] = useState<Array<any>>([]);

    useEffect(() => {
        loadBetsPools();
    }, []);

    const handleNewBetsPool = (pool: any) => {
        setBetPools((oldPools) => [...oldPools, pool]);
    };

    const loadBetsPools = () => {
        axios
            .get("/bets-pools")
            .then((response) => {
                setBetPools(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <h1>Bolões</h1>
            <div>
                <BetsPoolCreate onNewBetsPool={handleNewBetsPool} />
                <hr />
                {betsPools?.length > 0 ? (
                    betsPools.map((b) => (
                        <BetsPoolCard key={b.id} betsPool={b} />
                    ))
                ) : (
                    <p>Sem bolões</p>
                )}
            </div>
        </>
    );
}
