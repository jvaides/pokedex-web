import { useState, useEffect } from "react";
import { database } from "../service/firebase";
import { ref, onValue } from "firebase/database";

const localCache = {};

export default function useGetFirDatabase(userId) {
  const [teamEntries, setTeamEntries] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    status;
  }, [status]);
  useEffect(() => {
    if (!userId) {
      setTeamEntries([]);
    } else if (localCache[userId]) {
      setTeamEntries(localCache[userId]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setTeamEntries([]);
      setStatus("loading");
      const starCountRef = ref(database, "teams/" + userId);
      onValue(starCountRef, (snapshot) => {
        localCache[userId] = snapshot.val() || [];
        setTeamEntries(localCache[userId]);
        setStatus("loaded");
        //setUserTeams(data);
      });
    }
  }, [userId]);
  "lol", teamEntries;
  return [teamEntries, status];
}
