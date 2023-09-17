import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { MatchCard } from "../../components/";

export function Competitions() {
    const [competitionsList, setCompetitionsList] =
        useState<Array<{ value: string; label: string }>>();
    const [seasonYear, setSeasonYear] = useState<number>(-1);
    const [competition, setCompetition] = useState<number>(-1);
    const [matches, setMatches] = useState([]);
    const [message, setMessage] = useState<string>("");

    // Carregue as competições
    useEffect(() => {
        setMessage("Carregando competições");
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

    return (
        <>
            <h1>Campeonatos</h1>
            <p>{message}</p>
            {competitionsList != undefined && competitionsList.length > 0 ? (
                <Select
                    name="competitions"
                    options={competitionsList}
                    onChange={onCompetitionSelect}
                />
            ) : (
                <></>
            )}

            <label htmlFor="year">Insira o ano do Campeonato</label>
            <input type="text" name="year" onKeyDown={onYearSubmit} />

            {matches?.length > 0 ? (
                matches.map((m) => <MatchCard match={m} />)
            ) : (
                <></>
            )}
        </>
    );
}
