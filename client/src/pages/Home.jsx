import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TweeterChat from "../components/TweeterChat";

import { useSocketContext } from "../context/SocketContext";

function Home() {
  // socket context
  const socket = useSocketContext();

  return (
    <>
      <Sidebar />
      <TweeterChat socket={socket} />
    </>
  );
}

export default Home;
