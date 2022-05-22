import React from "react";
import { GenerationType, GenerationTypes } from "../lib/minecraftServer/types";
import SquidClient from "../lib/SquidClient";
import Button from "../components/Button";
import Center from "../components/Center";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import Select from "../components/Select";
import SubText from "../components/SubText";
import TextInput from "../components/TextInput";
import { VERSIONS } from "../config";

function Configuration({
  game,
  setGame,
}: {
  game: SquidClient | null;
  setGame: (game: SquidClient) => void;
}) {
  const [version, setVersion] = React.useState(VERSIONS[0]);
  const [motd, setMotd] = React.useState("An electric-squid server");
  const [worldGeneration, setWorldGeneration] =
    React.useState<GenerationType>("diamond_square");

  const setupServer = () => {
    const server = SquidClient.setupOrGetInstance(
      process.env.REACT_APP_PROXY_HOST!,
      {
        version,
        motd,
        worldGeneration,
      }
    );
    server.setupServer();

    setGame(server);
  };

  return (
    <PageLayout>
      <Center>
        <img src="/logo.png" alt="electric squid logo" className="w-24" />
      </Center>
      <PageHeader>electric-squid</PageHeader>
      <SubText className="text-center mt-3 mb-5">
        Minecraft Server in the browser
      </SubText>

      <Select
        label="Minecraft Version"
        value={version}
        onChange={(value) => setVersion(value)}
        options={VERSIONS}
      />

      <TextInput
        label="MOTD"
        value={motd}
        onChange={(value) => setMotd(value)}
        placeholder="An electric-squid server"
      />

      <Select
        label="World Generation"
        value={worldGeneration}
        onChange={(value) => setWorldGeneration(value as GenerationType)}
        options={GenerationTypes as unknown as string[]}
      />

      <Button onClick={setupServer}>Start server</Button>
    </PageLayout>
  );
}

export default Configuration;
