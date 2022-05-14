import React from "react";
import SquidClient from "../classes/SquidClient";
import TextInput from "./TextInput";

function Console({ game }: { game: SquidClient }) {
  const [console, setConsole] = React.useState("");

  return (
    <>
      <pre
        className="text-white font-mono bg-slate-900 text-left p-5 rounded mb-5"
        style={{ minHeight: "40vh" }}
      >
        {game?.minecraftServer.logger.messages.join("\n")}
      </pre>
      <TextInput
        label="Console"
        value={console}
        onChange={(value) => setConsole(value)}
        placeholder="Type a command here"
        type="text"
        className="mb-5"
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter") {
            game?.minecraftServer.logger.addLogMessage(`> ${console}`);
            // @ts-ignore
            game.minecraftServer.handleCommand(console);
            setConsole("");
          }
        }}
      />
    </>
  );
}

export default Console;
