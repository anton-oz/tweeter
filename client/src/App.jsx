import { Outlet } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.jsx";
import { AvatarProvider } from "./context/AvatarContext.jsx";

import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <>
      <SocketProvider>
        <AvatarProvider>
          <Outlet />
        </AvatarProvider>
      </SocketProvider>
    </>
  );
}

export default App;
