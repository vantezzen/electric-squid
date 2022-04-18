import { useEffect, useState } from "react";
import CauldronClient from "./classes/CauldronClient";

function App() {
  const [game, setGame] = useState<CauldronClient | null>(null);
  useEffect(() => {
    setGame(CauldronClient.instance);
  }, []);

  return <div>Hello</div>;
}

export default App;
