import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import usePokemon from "../hooks/usePokemon";
import PokemonItem from "./PokemonItem";
const Pokemon = ({ entry_number, name, url, addPokemonToTeam }) => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonDetailss] = usePokemon(pokemonName);
  /*const [pokemonForTeam, setPokemonForTeam] = useState({});

  const addPokemonToTeam = (chosenPokemon) => {
    setPokemonForTeam(chosenPokemon);
  };*/

  useEffect(() => {
    setPokemonName(name);
  });
  return (
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <PokemonItem
        pokemon={pokemonDetailss}
        addPokemonToTeam={addPokemonToTeam}
      />
    </div>
  );
};

export default Pokemon;
