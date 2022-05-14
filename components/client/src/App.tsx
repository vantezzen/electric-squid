import { useEffect, useState } from "react";
import SquidClient from "./classes/SquidClient";
import Configuration from "./pages/Configuration";
import Running from "./pages/Running";
import Starting from "./pages/Starting";

function App() {
  const [game] = useState<SquidClient>(() => {
    console.log("setting up game");

    return SquidClient.setupOrGetInstance(":3005", {
      version: "1.16",
      motd: "An electric-squid server",
    });
  });

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

  console.log(game?.minecraftServer.players);

  if (game.minecraftServer.isSetUp) {
    return <Running game={game} />;
  }
  if (game.minecraftServer.isSettingUp) {
    return <Starting game={game} />;
  }

  return <Configuration game={game} />;
}

export default App;
