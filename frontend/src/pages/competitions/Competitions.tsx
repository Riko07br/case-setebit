import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { MatchCard } from "./components";

export function Competitions() {
    const [competitionsList, setCompetitionsList] =
        useState<Array<{ value: string; label: string }>>();
    const [seasonYear, setSeasonYear] = useState<number>(-1);
    const [competition, setCompetition] = useState<number>(-1);
    const [matches, setMatches] = useState([]);
    const [betsPoolsList, setBetsPoolsList] = useState<
        Array<{ value: string; label: string }>
    >([]);
    const [message, setMessage] = useState<string>("");
    const [auth, setAuth] = useState<boolean>(false);
    const [betsPool, setBetsPool] = useState<number>();

    // Carregue as competições
    useEffect(() => {
        setMessage("Carregando competições");

        axios
            .get("/auth/status")
            .then((response) => {
                setAuth(response.data);
                loadBetsPools();
            })
            .catch((error) => {
                setAuth(false);
            });

        loadCompetitions();
    }, []);

    const loadCompetitions = () => {
        axios
            .get("/fdo/competitions")
            .then((response) => {
                let competitionsSelectOptions: Array<{
                    value: string;
                    label: string;
                }> = [];

                for (let i = 0; i < response.data.length; i++) {
                    const c = response.data[i];
                    competitionsSelectOptions.push({
                        value: c.id,
                        label: c.name,
                    });
                }

                setCompetitionsList(competitionsSelectOptions);
                setMessage("-");
            })
            .catch((error) => {
                setMessage("Não foi possível carregar as informações");
                console.error(error);
            });
    };

    const loadMatches = () => {
        axios
            .get(
                "/fdo/matches?competition=" +
                    competition +
                    "&year=" +
                    seasonYear
            )
            .then((response) => {
                setMatches(response.data);
            })
            .catch((error) => {
                setMessage("Não foi possível carregar as informações");
                console.error(error);
            });
    };

    const loadBetsPools = () => {
        axios
            .get("/bets-pools")
            .then((response) => {
                console.log(response.data);
                let betsPoolsSelectOptions: Array<{
                    value: string;
                    label: string;
                }> = [];

                for (let i = 0; i < response.data.length; i++) {
                    const c = response.data[i];
                    betsPoolsSelectOptions.push({
                        value: c.id,
                        label: c.name,
                    });
                }

                setBetsPoolsList(betsPoolsSelectOptions);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // on Events----------------------------------------
    const onCompetitionSelect = (e: any) => {
        if (!isNaN(e.value)) {
            setCompetition(e.value as number);
            if (seasonYear > -1) loadMatches();
        }
    };

    const onYearSubmit = (e: any) => {
        if (e.key === "Enter" && !isNaN(e.target.value)) {
            setSeasonYear(e.target.value as number);
            if (competition > -1) loadMatches();
        }
    };

    const onBetsPoolSelect = (e: any) => {
        if (!isNaN(e.value)) {
            setBetsPool(e.value as number);
            console.log("bets pools id " + e.value);
        }
    };

    return (
        <>
            <h1>Campeonatos</h1>
            <p>{message}</p>
            {auth && betsPoolsList.length > 0 ? (
                <>
                    Selecione o bolão:
                    <Select
                        name="bets-pools"
                        options={betsPoolsList}
                        onChange={onBetsPoolSelect}
                    />
                </>
            ) : (
                <></>
            )}
            {competitionsList != undefined && competitionsList.length > 0 ? (
                <>
                    Selecione o Campeonato:
                    <Select
                        name="competitions"
                        options={competitionsList}
                        onChange={onCompetitionSelect}
                    />
                </>
            ) : (
                <></>
            )}

            <label htmlFor="year">Insira o ano do Campeonato</label>
            <input type="text" name="year" onKeyDown={onYearSubmit} />

            {matches?.length > 0 ? (
                matches.map((m) => (
                    <MatchCard match={m} betsPoolId={betsPool} />
                ))
            ) : (
                <></>
            )}
        </>
    );
}
