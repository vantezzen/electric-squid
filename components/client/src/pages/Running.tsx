import React from "react";
import SquidClient from "../classes/SquidClient";
import Button from "../components/Button";
import Center from "../components/Center";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import SubText from "../components/SubText";

function Running({ game }: { game: SquidClient }) {
  return (
    <PageLayout>
      <div className="text-center">
        <PageHeader>Your server is ready!</PageHeader>

        <p className="mb-3">Server IP: {game.networkConnection.ip}</p>
        <p className="mb-3">
          Players:{" "}
          {game?.minecraftServer.players
            .map((player) => player.username)
            .join(", ") ?? "No players"}
        </p>
        <pre
          className="text-white font-mono bg-slate-900 text-left"
          style={{ minHeight: "40vh" }}
        >
          {game?.minecraftServer.logger.messages.join("\n")}
        </pre>
      </div>
    </PageLayout>
  );
}

export default Running;
