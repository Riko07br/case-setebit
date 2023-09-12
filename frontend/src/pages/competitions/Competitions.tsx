import React, { useEffect } from "react";
import axios from "axios";

export function Competitions() {
    axios.get(import.meta.env.VITE_FDO_API_URL, {
        headers: {
            "X-Auth-Token": import.meta.env.VITE_FDO_API_TOK,
        },
    });

    // on page load
    // useEffect(() => {
    //     setPlayAnimation(true);
    //   }, []);

    return (
        <>
            <h1>Campeonatos</h1>
        </>
    );
}
