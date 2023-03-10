const PokemonItem = ({ pokemon, addPokemonToTeam }) => {
  if (pokemon.sprites == undefined) {
    return <div>Cargando ...</div>;
  }
  return (
    <div>
      <img
        className="rounded-t-lg"
        src={pokemon.sprites.front_default}
        alt=""
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pokemon.name}
        </h5>
        <div className="text-gray-900 dark:text-white">
          <ul>
            <li>Experiencia:{pokemon.base_experience}</li>
            <li>Tamaño:{pokemon.height}</li>
            <li>Peso:{pokemon.weight}</li>
          </ul>
        </div>
        <button
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => addPokemonToTeam(pokemon)}
        >
          Agregar a equipo
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PokemonItem;
