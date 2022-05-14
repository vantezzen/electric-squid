import React from "react";
import SquidClient from "../classes/SquidClient";
import Button from "../components/Button";
import Center from "../components/Center";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import SubText from "../components/SubText";

function Configuration({ game }: { game: SquidClient }) {
  return (
    <PageLayout>
      <Center>
        <img src="/src/logo.png" alt="electric squid logo" className="w-24" />
      </Center>
      <PageHeader>electric squid</PageHeader>
      <SubText className="text-center mt-3 mb-5">
        Minecraft 1.13.2 Server in the browser
      </SubText>

      <Button onClick={() => game.setupServer()}>Start server</Button>
    </PageLayout>
  );
}

export default Configuration;
