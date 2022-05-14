import { useEffect, useState } from "react";
import SquidClient from "./classes/SquidClient";
import Configuration from "./pages/Configuration";
import Running from "./pages/Running";
import Starting from "./pages/Starting";

function App() {
  const [game, setGame] = useState<SquidClient | null>(null);

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

  if (game?.minecraftServer.isSetUp) {
    return <Running game={game} />;
  }
  if (game?.minecraftServer.isSettingUp) {
    return <Starting game={game} />;
  }

  return <Configuration game={game} setGame={setGame} />;
}

export default App;
