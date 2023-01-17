import { useState, useEffect } from "react";

const localCache = {};

export default function usePokedex(pokedexUrl) {
  const [pokemonEntries, setPokemonEntries] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    status;
  }, [status]);
  useEffect(() => {
    if (!pokedexUrl) {
      setPokemonEntries([]);
    } else if (localCache[pokedexUrl]) {
      setPokemonEntries(localCache[pokedexUrl]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setPokemonEntries([]);
      setStatus("loading");
      const res = await fetch(`${pokedexUrl}`);
      const json = await res.json();
      localCache[pokedexUrl] = json.pokemon_entries || [];
      setPokemonEntries(localCache[pokedexUrl]);
      setStatus("loaded");
    }
  }, [pokedexUrl]);
  pokemonEntries;

  return [pokemonEntries, status];
}
