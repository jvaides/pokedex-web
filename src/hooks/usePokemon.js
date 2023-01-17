import { useState, useEffect } from "react";

const localCache = {};

export default function usePokedex(pokemonName) {
  const [pokemonInformation, setPokemonInformation] = useState({});
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    status;
  }, [status]);
  useEffect(() => {
    if (!pokemonName) {
      setPokemonInformation([]);
    } else if (localCache[pokemonName]) {
      setPokemonInformation(localCache[pokemonName]);
    } else {
      request();
    }

    async function request() {
      setPokemonInformation([]);
      setStatus("loading pokemon ");
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const json = await res.json();
      localCache[pokemonName] = json || [];
      setPokemonInformation(localCache[pokemonName]);
      setStatus("loaded pokemon ");
    }
  }, [pokemonName]);
  return [pokemonInformation, status];
}
