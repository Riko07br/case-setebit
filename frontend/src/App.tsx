import { useEffect, useState } from "react";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import { Home, NoPage } from "./pages";
import { Login, Register } from "./pages/auth";
import { Navbar } from "./components";
import { Bet } from "./pages/bets";
import { Competitions } from "./pages/competitions";
import axios from "axios";

function App() {
    let [auth, setAuth] = useState<boolean>(false);

    // Default axios config
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    axios.defaults.headers.common.Accept = "*/*";
    axios.defaults.withCredentials = true;

    // Initialize
    useEffect(() => {
        axios
            .get("/auth/status")
            .then((response) => {
                console.log("sign status: " + response.data);
                setAuth(response.data);
            })
            .catch((error) => {
                console.error(error);
                setAuth(false);
            });
    }, []);

    useEffect(() => {
        // if else quando esta carregando
    }, [auth]);

    return (
        <Router>
            <Navbar isAuth={auth} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/competitions" element={<Competitions />} />

                <Route
                    path="login"
                    element={!auth ? <Login /> : <Navigate to="/" />}
                />
                <Route
                    path="register"
                    element={!auth ? <Register /> : <Navigate to="/" />}
                />

                <Route
                    path="bets"
                    element={auth ? <Bet /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
}

export default App;
