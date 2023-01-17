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
    <div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Mis equipos
      </h5>
      <div className="grid gap-4 grid-cols-3 ">
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
