import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface Prop {
    isAuth: boolean;
    name?: string;
}

export const Navbar: React.FC<Prop> = (prop) => {
    const navigate = useNavigate();

    const onLogout = () => {
        if (prop.isAuth) {
            axios
                .get("/auth/signout")
                .then((response) => {
                    console.log(response.data);
                    navigate("/");
                    navigate(0);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                {prop.isAuth ? (
                    <>
                        Olar usuario
                        <li>
                            <button onClick={onLogout}>Sair</button>
                        </li>
                        <li>
                            <Link to="/bets">Bolões</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Registrar</Link>
                        </li>
                    </>
                )}

                <li>
                    <Link to="/competitions">Campeonatos</Link>
                </li>
            </ul>
        </nav>
    );
};
