import { render } from "react-dom";
import { StrictMode, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./service/firebase";

import Login from "./components/Login";
import Home from "./components/Home";
import Pokemons from "./components/Pokemons";
import UserTeams from "./components/UserTeams";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Login></Login>}
          />
          <Route
            path="/home"
            element={user ? <Home user={user}></Home> : <Login></Login>}
          />
          <Route
            path="/league/pokemons/:name"
            element={user ? <Pokemons></Pokemons> : <Login></Login>}
          />
          <Route
            path="/profile/1"
            element={user ? <UserTeams></UserTeams> : <Login></Login>}
          />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
