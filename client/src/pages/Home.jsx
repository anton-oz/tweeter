import { useEffect, useState } from "react";
import TweeterChat from "../components/TweeterChat";

import { useSocketContext } from "../context/SocketContext";

function Home() {
  // socket context
  const socket = useSocketContext();

  return <TweeterChat socket={socket} />;

  // return (
  //   <>
  //     <TweeterChat socket={socket} />
  //     <div className="cstm-container">
  //       <div className="flex flex-row">
  //         <input
  //           placeholder="Room Number..."
  //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-coolGray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //           onChange={(event) => {
  //             setRoom(event.target.value);
  //           }}
  //         />
  //         {/* <button onClick={joinRoom} className="cstm-btn">
  //             Join Room
  //         </button> */}
  //         <button
  //           className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
  //           onClick={joinRoom}
  //         >
  //           <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
  //             Join Room
  //           </span>
  //         </button>
  //       </div>
  //       <div className="flex flex-row">
  //         <input
  //           placeholder="Message..."
  //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-coolGray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //           onChange={(event) => {
  //             setPost(event.target.value);
  //           }}
  //         />
  //         <button
  //           className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
  //           onClick={sendPost}
  //         >
  //           <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
  //             Send Post
  //           </span>
  //         </button>
  //       </div>
  //       <h1>Posts:</h1>
  //       {posts.map((post, i) => (
  //         <div className="message" key={i}>
  //           {post}
  //         </div>
  //       ))}
  //     </div>
  //   </>
  // );
}

export default Home;
