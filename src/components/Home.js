import { React, Component } from "react";
import { useEffect, useState } from "react";
import { auth } from "../service/firebase";
import NavBar from "./NavBar";
import PokemonLeague from "./PokemonLeague";

const Home = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    requestPokemonLeagues();
  }, []);

  async function requestPokemonLeagues() {
    const res = await fetch("https://pokeapi.co/api/v2/region/");
    const json = await res.json();
    setLeagues(json.results);
  }

  leagues;
  return (
    <div className="home">
      <NavBar />

      <div className="grid gap-4 grid-cols-4">
        {!leagues.length ? (
          <h1>No Pets Found</h1>
        ) : (
          leagues.map((league) => {
            return <PokemonLeague name={league.name} url={league.url} />;
          })
        )}
      </div>
    </div>
  );
};

export default Home;
