import { useState, useEffect } from "react";
import { database, auth } from "../service/firebase";
import { ref, onValue, set, push } from "firebase/database";

const localCache = {};

export default function useRegisterFirDatabase(
  userId,
  region,
  pokemons,
  name,
  shouldInsertDB
) {
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    status;
  }, [status]);
  useEffect(() => {
    if (!userId) {
      setStatus("unloaded");
    } else if (localCache[userId]) {
      setStatus(localCache[userId]);
    } else {
      request();
    }

    async function request() {
      if (shouldInsertDB === true) {
        setStatus("loading");
        const data = {
          user: auth.currentUser.displayName,
          region: region,
          pokemons: pokemons,
          name: name,
        };
        const starCountRef = ref(database, "teams/" + userId);
        push(starCountRef, data)
          .then(() => {
            localCache[userId] = snapshot.toJSON() || [];
            setStatus("loaded");
          })
          .catch((error) => {
            setStatus("unloaded");
          });
      } else {
        setStatus("unloaded");
      }
    }
  }, [userId]);

  return [status];
}
