import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./pages";
import { Login, Register } from "./pages/auth";
import { Navbar } from "./components";
import { Bet } from "./pages/bets";
import { Competitions } from "./pages/competitions";
import axios from "axios";

function App() {
    let [authenticated, setAuthenticated] = useState<boolean>(false);

    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    axios.defaults.withCredentials = true;

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/bets" element={<Bet />} />
                <Route path="/competitions" element={<Competitions />} />
            </Routes>
        </Router>
    );
}

export default App;
