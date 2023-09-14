import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Registrar</Link>
                </li>
                <li>
                    <Link to="/bets">Bolões</Link>
                </li>
                <li>
                    <Link to="/competitions">Campeonatos</Link>
                </li>
            </ul>
        </nav>
    );
}
