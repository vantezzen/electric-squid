import { useEffect, useState } from "react";
import SquidClient from "./classes/SquidClient";

function App() {
  const [game] = useState<SquidClient | null>(() => {
    console.log("setting up game");

    return SquidClient.setupOrGetInstance(":3005", {
      version: "1.13.2",
      motd: "Hello",
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

  return (
    <div>
      flying-squid
      <br />
      {Object.keys(game?.minecraftServer.commands).join(", ")}
      <br />
      {game?.minecraftServer.status}
      <br />
      {game?.minecraftServer.players.map((player) => player.username).join()}
      <br />
      {game?.minecraftServer.logger.messages.join("<br />")}
      <br />
      <button onClick={() => game?.setupServer()}>Setup server</button>
    </div>
  );
}

export default App;
