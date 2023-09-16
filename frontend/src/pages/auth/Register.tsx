import axios from "axios";
import React from "react";

export function Register() {
    const axiosInstance = axios.create({
        headers: {
            Accept: "*/*",
        },
    });

    return (
        <>
            <h1>Registrar</h1>
        </>
    );
}

//export default Register;
