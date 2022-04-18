import { useState } from "react";
import CauldronClient from "./classes/CauldronClient";

function App() {
  const [game, setGame] = useState(
    () =>
      new CauldronClient(":3000", {
        version: "1.17.1",
        motd: "Hello",
        port: 30001,
      })
  );

  return <div>Hello</div>;
}

export default App;
