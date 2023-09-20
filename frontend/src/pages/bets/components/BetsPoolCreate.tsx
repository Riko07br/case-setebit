import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Prop {
    onNewBetsPool: Dispatch<SetStateAction<any>>;
}

// Form to create a bets pool
export const BetsPoolCreate: React.FC<Prop> = (prop) => {
    const [name, setName] = useState<string>("");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (name == "") return;

        const responseBody = { name };

        axios
            .post("/bets-pools", responseBody)
            .then((response) => {
                console.log(response.data);
                prop.onNewBetsPool(response.data);
                setName("");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Criar novo bolão</h3>
            <div>
                <label htmlFor="name">Nome do bolão</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button type="submit">Criar bolão</button>
        </form>
    );
};
