import { useEffect, useState } from "react";
import SquidClient from "../classes/SquidClient";
import debugging from "debug";
import { EXTENDED_DEBUGGING } from "../config";
const debug = debugging("squid:useSyncWithGameState");

export function useSyncWithGameState(game: SquidClient | null) {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const updateListener = () => {
      if (EXTENDED_DEBUGGING) {
        debug("Forcing update based on game state");
      }

      forceUpdate({});
    };
    game?.on("update", updateListener);

    return () => {
      game?.removeListener("update", updateListener);
    };
  }, [game]);
}
