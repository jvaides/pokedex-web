import useGetFirDatabase from "../hooks/useGetFirDatabase";
import NavBar from "./NavBar";
import { auth } from "../service/firebase";
import TeamList from "./TeamList";
const UerTeams = () => {
  const [userTeams] = useGetFirDatabase(auth.currentUser.uid);
  return (
    <div>
      <NavBar />
      <TeamList teamList={userTeams} />
    </div>
  );
};

export default UerTeams;
