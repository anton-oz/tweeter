import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import arrow from "../assets/arrow.svg";

const socket = io.connect("http://localhost:3001");

const testPosts = [
  {
    user: {
      name: "Owen Kanzler",
    },
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus nulla efficitur interdum fringilla. Maecenas consequat interdum finibus. Aliquam condimentum arcu sed augue feugiat, ullamcorper commodo erat sodales. Vestibulum congue blandit lectus id laoreet. Etiam a mauris faucibus, interdum risus sit amet, luctus dui.",
  },
];

export default function TweeterChat() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {
    // fetchPosts();
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      setPosts((prevPosts) => [...prevPosts, data.message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);

  //   const joinRoom = () => {
  //     if (room !== "") {
  //       socket.emit("join_room", room);
  //     }
  //   };

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  // switch to a graphQl query
  const fetchPosts = async () => {
    // fetch posts from the server
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newPost = {
      // Make it so it figures out who the user is
      user: { name: "", avatar: "" },
      message: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    // post or mutation to the server
  };

  return (
    <main className="pl-[17.75rem] p-8 flex flex-col gap-8 h-screen justify-end w-screen">
      <div className="flex flex-col gap-4">
        {/* change to the server posts */}
        {posts.map((post, i) => (
          <Post
            key={post._id || i}
            user={{ name: "Owen Kanzler" }}
            message={post.post}
          />
        ))}
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-4 bg-interactive py-4 px-6 rounded-lg border border-border"
      >
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type a message according to the topic"
          className="w-full bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          onClick={sendMessage}
          className="bg-primary p-2 rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out"
        >
          <img src={arrow} alt="submit" />
        </button>
      </form>
    </main>
  );
}
