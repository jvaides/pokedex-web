import { React, Component } from "react";
import { useEffect, useState } from "react";
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

  return (
    <div className="home ">
      <NavBar />

      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-3.5">
        {!leagues.length ? (
          <h1>No pokemons Found</h1>
        ) : (
          leagues.map((league) => {
            return (
              <PokemonLeague
                name={league.name}
                url={league.url}
                key={league.name}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
