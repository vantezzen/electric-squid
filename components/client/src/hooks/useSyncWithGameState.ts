import { useEffect, useState } from "react";
import SquidClient from "../classes/SquidClient";

export function useSyncWithGameState(game: SquidClient | null) {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const updateListener = () => {
      forceUpdate({});
    };
    game?.on("update", updateListener);

    return () => {
      game?.removeListener("update", updateListener);
    };
  }, [game]);
}
