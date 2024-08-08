import React, { useState, useEffect } from "react";
import Post from "./Post";
import arrow from "../assets/arrow.svg";

export default function TweeterChat({ socket }) {
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [room, setRoom] = useState("1");

  useEffect(() => {
    const joinRoom = () => {
      if (room !== "") {
       socket.emit("join_room", room);
      }
    };
    joinRoom();
  }, [])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Received message:", data.message);
      setPosts((prevPosts) => [...prevPosts, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendPost = () => {
    socket.emit("send_message", { message, room, user: { name: "Owen Kanzler", avatar: "" } });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newPost = {
      user: { name: "Owen Kanzler", avatar: "" },
      message
    };

    sendPost();
    // setPosts((prevPosts) => [...prevPosts, newPost]);
    setMessage("");
  };

  return (
    <main className="pl-[17.75rem] p-8 flex flex-col gap-8 h-screen justify-end w-screen">
      <div className="flex flex-col gap-4">
        {posts.map((post, i) => (
          <Post
            key={i}
            user={post.user}
            message={{ user: post.user, message: post.message }}
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
          className="bg-primary p-2 rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out"
        >
          <img src={arrow} alt="submit" />
        </button>
      </form>
    </main>
  );
}
