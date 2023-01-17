import { React, Component } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import Pokemon from "./Pokemon";
import usePokedex from "../hooks/usePokedex";
import TeamModal from "./TeamModal";
import NavBar from "./NavBar";
const Pokemons = () => {
  //const [pokemonEntries, setPokemonEntries] = useState([]);
  const [pokedexUrl, setPokedexUrl] = useState("");
  const [pokemonEntries] = usePokedex(pokedexUrl);
  const params = useParams();
  const [pokemonForTeam, setPokemonForTeam] = useState({});

  const addPokemonToTeam = (chosenPokemon) => {
    setPokemonForTeam(chosenPokemon);
  };

  useEffect(() => {
    requestLeaguePokemons();
  }, []);

  async function requestLeaguePokemons() {
    const res = await fetch(`https://pokeapi.co/api/v2/region/${params.name}`);
    const json = await res.json();
    setPokedexUrl(json.pokedexes[0].url);
  }

  return (
    <div>
      <NavBar />
      <div className="grid gap-4 grid-cols-4 ">
        {!pokemonEntries.length ? (
          <h1>No pokemons Found</h1>
        ) : (
          pokemonEntries.map((league) => {
            return (
              <Pokemon
                key={league.entry_number}
                entry_number={league.entry_number}
                name={league.pokemon_species.name}
                url={league.pokemon_species.url}
                addPokemonToTeam={addPokemonToTeam}
              />
            );
          })
        )}
      </div>
      <TeamModal pokemon={pokemonForTeam} region={params.name} />
    </div>
  );
};

export default Pokemons;
