import { Outlet } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.jsx";

import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <>
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    </>
  );
}

export default App;
