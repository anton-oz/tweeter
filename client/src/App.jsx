
import { Outlet } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.jsx";

import Nav from "./components/Nav.jsx";
import TweeterChat from "./components/TweeterChat.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <>
      <SocketProvider>
        <Nav />
        <Outlet />
      </SocketProvider>
    </>
  );
}

export default App;

// function App() {
//   // Room State
//   const [room, setRoom] = useState("");

//   // Messages States
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");
//   const [messageArr, setMessageArr] = useState([]);

//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("join_room", room);
//     }
//   };

//   const sendMessage = () => {
//     socket.emit("send_message", { message, room });
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.message);
//       setMessageArr((prevMessages) => [...prevMessages, data.message]);
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off("receive_message");
//     };
//   }, []);

//   return (
//     <>
//       <Nav />
//       <div className="cstm-container">
//         <div className="flex flex-row">
//           <input placeholder="Room Number..." 
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-coolGray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           onChange={(event) => {
//               setRoom(event.target.value);
//               }}
//           />
//           {/* <button onClick={joinRoom} className="cstm-btn">
//               Join Room
//           </button> */}
//           <button 
//             className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
//             onClick={joinRoom}
//           >
//             <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//             Join Room
//             </span>
//           </button>
//         </div>
//         <div className="flex flex-row">
//           <input
//             placeholder="Message..."
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-coolGray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             onChange={(event) => {
//               setMessage(event.target.value);
//             }}
//           />
//           <button 
//             className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
//             onClick={sendMessage}>      
//             <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//             Send Message
//             </span>
//           </button>
//         </div>
//         <h1>Message:</h1>
//         {messageArr.map((mes, i) => (
//           <div className="message" key={i}>
//             {mes}
//           </div>
//         ))}
//       </div>
//       <Outlet />
//     </>
//   );
// }

// export default App;
