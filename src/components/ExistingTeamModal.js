import { useEffect, useState, Fragment, useRef } from "react";
import { auth, database } from "../service/firebase";
import { Transition } from "@headlessui/react";
import { ref, update } from "firebase/database";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const ExistingTeamModal = ({ pokemons, teamkey }) => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  var val = 0;

  useEffect(() => {
    pokemons;
  });
  const insertPokemonToExistingTeam = (pokemonId) => {
    if (pokemons.pokemons.length > 3) {
      pokemons.pokemons.splice(pokemonId, 1);
      pokemons;
      const pokemonRef = ref(
        database,
        "teams/" + auth.currentUser.uid + "/" + teamkey
      );
      update(pokemonRef, pokemons)
        .then(() => {})
        .catch((error) => {
          ("unloaded");
        });
    }
  };

  if (teamkey === "") {
    return <div></div>;
  }
  return (
    <div>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Editar Equipo
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="mt-2">
                            <p>
                              Los equipos deben de tener un minimo de 3 pokemons
                              y un maximo de 6 pokemos
                            </p>
                            <div className="grid gap-2 grid-cols-3 ">
                              {!pokemons.pokemons.length ? (
                                <h1>No pokemons Found</h1>
                              ) : (
                                pokemons.pokemons.map((league, index) => {
                                  return (
                                    <div>
                                      {pokemons.pokemons.length > 3 ? (
                                        <div className="relative ">
                                          <div className="absolute top-0 right-0 h-16 w-16">
                                            <div className="mx-auto flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-8 sm:w-8">
                                              <TrashIcon
                                                className="h-4 w-4 text-red-600"
                                                aria-hidden="true"
                                                title="El equipo debe de contar con al menos 3 pokemons"
                                                onClick={() => {
                                                  insertPokemonToExistingTeam(
                                                    index
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div></div>
                                      )}

                                      <img
                                        className="rounded-t-lg"
                                        src={league.pokemon_image}
                                        alt=""
                                        title={league.name}
                                        key={league.order + league.name}
                                      />
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <Link
                            to={`/league/pokemons/${pokemons.region}`}
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Agregar otro pokemon
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
                          </Link>
                          <button
                            type="button"
                            ref={cancelButtonRef}
                            onClick={() => setOpen(false)}
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Cancel
                          </button>
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
    </div>
  );
};

export default ExistingTeamModal;
