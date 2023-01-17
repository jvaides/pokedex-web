import { useEffect, useState } from "react";
import TeamListItem from "./TeamListItem";
import ExistingTeamModal from "./ExistingTeamModal";
const TeamList = (teamlist) => {
  const [teamInformation, setTeamInformation] = useState({});
  const [teamKey, setTeamKey] = useState("");
  const showTeamInfo = (teamInfo, key) => {
    setTeamInformation(teamInfo);
    setTeamKey(key);
  };
  useEffect(() => {
    teamlist.teamList;
  });
  if (teamlist == undefined) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="mx-3.5 my-3.5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Mis equipos
      </h5>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
        {Object.keys(teamlist.teamList).map((key, index) => (
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <TeamListItem
              pokemon={teamlist.teamList[key]}
              fkey={key}
              showTeamInfo={showTeamInfo}
            />
          </div>
        ))}
      </div>

      <ExistingTeamModal
        pokemons={teamInformation}
        teamkey={teamKey}
      ></ExistingTeamModal>
    </div>
  );
};

export default TeamList;
