import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        let responseBody: { [key: string]: FormDataEntryValue } = {};

        formData.forEach(
            (value, property: string) => (responseBody[property] = value)
        );

        axios
            .post("/auth/signin", responseBody)
            .then((response) => {
                console.log("login:" + response.data);
                navigate("/");
                navigate(0);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" />
                </div>
                <hr />
                <button type="submit">Entrar</button>
            </form>
            É novo aqui? <Link to="/register">Registrar</Link>
        </>
    );
}
