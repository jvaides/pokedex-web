import { useEffect, useState, Fragment, useRef } from "react";
import { auth, database } from "../service/firebase";
import useGetFirDatabase from "../hooks/useGetFirDatabase";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ref, push, update } from "firebase/database";
import { Dialog, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TeamModal = ({ pokemon, didAddPokemon, region }) => {
  const [userTeams] = useGetFirDatabase(auth.currentUser.uid);
  const [selected, setSelected] = useState({});
  const [canBeAdded, setCanBeAdded] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [open, setOpen] = useState(true);
  const [teamId, setTeamId] = useState("");
  const cancelButtonRef = useRef(null);
  useEffect(() => {
    validatePokemonInTeam();
  });

  const addPokemonToTeam = (event) => {
    setTeamName(event.target.value);
  };

  const insertPokemonToTeam = () => {
    ("insertPokemonToTeam");
    const pokemonInsert = {
      name: pokemon.name,
      species_url: pokemon.species.url,
      pokemon_url: `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`,
      pokemon_image: pokemon.sprites.front_default,
      order: pokemon.order,
    };
    const data = {
      user: auth.currentUser.displayName,
      region: region,
      pokemons: [pokemonInsert],
      name: teamName,
    };
    const starCountRef = ref(database, "teams/" + auth.currentUser.uid);
    push(starCountRef, data)
      .then(() => {
        pokemon = {};
        setOpen(false);
      })
      .catch((error) => {
        ("unloaded");
      });
  };

  const insertPokemonToExistingTeam = () => {
    const pokemonInsert = {
      name: pokemon.name,
      species_url: pokemon.species.url,
      pokemon_url: `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`,
      pokemon_image: pokemon.sprites.front_default,
      order: pokemon.order,
    };
    const existingpokemons = selected.pokemons;
    existingpokemons.length;
    if (existingpokemons.length <= 5) {
      existingpokemons.push(pokemonInsert);
      const data = {
        user: auth.currentUser.displayName,
        region: region,
        pokemons: existingpokemons,
      };
      const pokemonRef = ref(
        database,
        "teams/" + auth.currentUser.uid + "/" + teamId
      );
      update(pokemonRef, data)
        .then(() => {
          setOpen(false);
        })
        .catch((error) => {
          ("unloaded");
        });
    } else {
      ("limit has reached");
    }
  };

  async function validatePokemonInTeam() {
    selected;
    pokemon;
    if (Object.keys(selected).length !== 0) {
      const teamRegion = selected.region;
      if (teamRegion == region) {
        setCanBeAdded(false);
      } else {
        setCanBeAdded(true);
      }
    }
  }

  if (pokemon.sprites == undefined) {
    return <div>loading</div>;
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/90 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg h-auto">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Agregar pokemon a un equipo
                      </Dialog.Title>
                      <div className="mt-2">
                        <p>
                          Selecciona el equipo al que deseas agregar a{" "}
                          {pokemon.name}{" "}
                        </p>
                        <div class="mt-2">
                          <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                              <>
                                <Listbox.Label className="block text-sm font-medium text-gray-700">
                                  Escoje un equipo
                                </Listbox.Label>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                    <span className="flex items-center">
                                      <span className="ml-3 block truncate">
                                        {selected.name}
                                      </span>
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                      <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {Object.keys(userTeams).map(
                                        (key, index) => (
                                          <Listbox.Option
                                            key={index}
                                            onClick={() => setTeamId(key)}
                                            className={({ active }) =>
                                              classNames(
                                                active
                                                  ? "text-white bg-indigo-600"
                                                  : "text-gray-900",
                                                "relative cursor-default select-none py-2 pl-3 pr-9"
                                              )
                                            }
                                            value={userTeams[key]}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <div className="flex items-center">
                                                  <span
                                                    className={classNames(
                                                      selected
                                                        ? "font-semibold"
                                                        : "font-normal",
                                                      "ml-3 block truncate"
                                                    )}
                                                  >
                                                    {userTeams[key].name}
                                                  </span>
                                                </div>

                                                {selected ? (
                                                  <span
                                                    className={classNames(
                                                      active
                                                        ? "text-white"
                                                        : "text-indigo-600",
                                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                                    )}
                                                  >
                                                    <CheckIcon
                                                      className="h-5 w-5"
                                                      aria-hidden="true"
                                                    />
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Listbox.Option>
                                        )
                                      )}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>
                        {canBeAdded ? (
                          <div>
                            <p class="mt-2">
                              No se puede agregar a este equipo porque pertence
                              a otra region, pero puede crear un nuevo equipo
                              con este pokemon.
                            </p>
                            <div>
                              <label
                                htmlFor="teamname"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Nombre del equipo
                              </label>
                              <div className="relative mt-1 rounded-md shadow-sm">
                                <input
                                  type="text"
                                  name="teamname"
                                  id="teamname"
                                  className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  placeholder="Escribe el nombre del equipo aqui"
                                  onChange={addPokemonToTeam}
                                />
                              </div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="button"
                                onClick={insertPokemonToTeam}
                                class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Crear nuevo equipo
                              </button>
                              <button
                                type="button"
                                ref={cancelButtonRef}
                                onClick={() => setOpen(false)}
                                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              onClick={() => insertPokemonToExistingTeam()}
                              class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Agregar
                            </button>
                            <button
                              type="button"
                              ref={cancelButtonRef}
                              onClick={() => setOpen(false)}
                              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Cancelar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TeamModal;
