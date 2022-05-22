import { useState } from "react";
import SquidClient from "./lib/SquidClient";
import { useSyncWithGameState } from "./hooks/useSyncWithGameState";
import Configuration from "./pages/Configuration";
import Running from "./pages/Running";
import Starting from "./pages/Starting";

function App() {
  const [game, setGame] = useState<SquidClient | null>(null);
  useSyncWithGameState(game);

  if (game?.minecraftServer.isSetUp) {
    return <Running game={game} />;
  }
  if (game?.minecraftServer.isSettingUp) {
    return <Starting game={game} />;
  }

  return <Configuration game={game} setGame={setGame} />;
}

export default App;
