import React from "react";
import { Player } from "../lib/minecraftServer/types";
import SquidClient from "../lib/SquidClient";
import Button from "../components/Button";
import Console from "../components/Console";
import Fact from "../components/Fact";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import TextInput from "../components/TextInput";

function Running({ game }: { game: SquidClient }) {
  return (
    <PageLayout>
      <div className="text-center">
        <PageHeader>Your server is ready!</PageHeader>

        <Fact title="Server IP">
          <code>{game.networkConnection.ip}</code>
        </Fact>

        <Fact title="Players">
          {game?.minecraftServer.players.length
            ? game?.minecraftServer.players
                .map((player: Player) => player.username)
                .join(", ")
            : "No players"}
        </Fact>

        <Fact title="Version">
          <code>{game.minecraftServer.version?.majorVersion}</code>
        </Fact>

        <Console game={game} />

        <Button
          onClick={() => {
            // Incredibly hacky way to do this but works for now
            window.location.reload();
          }}
        >
          Close server
        </Button>
      </div>
    </PageLayout>
  );
}

export default Running;
