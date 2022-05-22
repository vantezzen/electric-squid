import React from "react";
import SquidClient from "../classes/SquidClient";
import Button from "../components/Button";
import Center from "../components/Center";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import SubText from "../components/SubText";
import { useChunkProgressInfo } from "../hooks/useChunkProgressInfo";

function Starting({ game }: { game: SquidClient }) {
  const chunkProgress = useChunkProgressInfo();
  return (
    <PageLayout>
      <div className="text-center">
        <PageHeader>Starting your server...</PageHeader>
        <SubText className="text-lg py-3">
          {game.minecraftServer.status}
        </SubText>
        <SubText className="text-lg py-3">
          Downloaded {chunkProgress.loadedBytes} of {chunkProgress.totalBytes} (
          {chunkProgress.progress}%)
        </SubText>
        <SubText>This might take a few seconds</SubText>
      </div>
    </PageLayout>
  );
}

export default Starting;
