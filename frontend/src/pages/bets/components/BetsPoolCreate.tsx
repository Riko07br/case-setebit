import axios from "axios";
import React from "react";

// Form to create a bets pool
export const BetsPoolCreate = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        let responseBody: { [key: string]: FormDataEntryValue } = {};

        formData.forEach(
            (value, property: string) => (responseBody[property] = value)
        );

        axios
            .post("/bets-pools", responseBody)
            .then((response) => {
                console.log(response.data);
                //navigate to bets pool
                //navigate("/");
                //navigate(0);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome do bolão</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div>
                    <p>Adicionar jogos</p>
                </div>
                <button type="submit">Criar bolão</button>
            </form>
        </>
    );
};
