import React, { useEffect, useState } from "react";
import Select, { InputActionMeta } from "react-select";
import axios from "axios";
import { SingleValue } from "react-select/animated";

export function Competitions() {
    const [competitions, setCompetitions] =
        useState<Array<{ value: string; label: string }>>();
    const [competitionSeason, setCompetitionSeason] =
        useState<Array<{ value: string; label: string }>>();

    // Carregue as competições
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/fdo/competitions", {
                headers: {
                    Accept: "*/*",
                    "Access-Control-Allow-Origin": "*",
                },
            })
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

                setCompetitions(competitionsSelectOptions);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const onCompetitionSelect = (e: any) => {
        console.log(e.value);
        axios
            .get(
                import.meta.env.VITE_API_URL + "/fdo/competitions/" + e.value,
                {
                    headers: {
                        Accept: "*/*",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            )
            .then((response) => {
                let competitionsSelectOptions: Array<{
                    value: string;
                    label: string;
                }> = [];

                for (let i = 0; i < response.data.length; i++) {
                    const c = response.data[i];
                    competitionsSelectOptions.push({
                        value: c.id,
                        label: "Temp. " + c.startDate + " " + c.endDate,
                    });
                }

                setCompetitionSeason(competitionsSelectOptions);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <h1>Campeonatos</h1>
            {competitions != undefined && competitions.length > 0 ? (
                <Select
                    name="competitions"
                    options={competitions}
                    onChange={onCompetitionSelect}
                />
            ) : (
                <p>Carregando competições</p>
            )}

            {competitionSeason != undefined && competitionSeason.length > 0 ? (
                <Select name="seasons" options={competitionSeason} />
            ) : (
                <></>
            )}
        </>
    );
}
