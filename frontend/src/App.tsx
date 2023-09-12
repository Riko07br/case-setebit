import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Login, Register } from "./pages/auth";
import Navbar from "./components/Navbar";
import { Bet } from "./pages/bets";
import { Competitions } from "./pages/competitions";

function App() {
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
