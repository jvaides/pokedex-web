import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const TeamListItem = ({ pokemon, fkey, showTeamInfo }) => {
  return (
    <div>
      <div class="p-5">
        {pokemon.pokemons.length < 3 ? (
          <div class="relative ">
            <div class="absolute top-0 right-0 h-16 w-16">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                  title="El equipo debe de contar con al menos 3 pokemons"
                />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pokemon.name}
        </h5>
        <div className="grid gap-4 grid-cols-3 ">
          {!pokemon.pokemons.length ? (
            <h1>No hay pokemons</h1>
          ) : (
            pokemon.pokemons.map((league) => {
              return (
                <img
                  class="rounded-t-lg"
                  src={league.pokemon_image}
                  alt=""
                  title={league.name}
                  key={league.order + league.name}
                />
              );
            })
          )}
        </div>
        <button
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => showTeamInfo(pokemon, fkey)}
        >
          Editar equipo
          <svg
            aria-hidden="true"
            class="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TeamListItem;
