import React, { useState, useEffect } from "react";
import Post from "./Post";
import MessageInput from "./MessageInput";
import AuthService from "../utils/auth";

import Question from "./Question";

export default function TweeterChat({ socket }) {
  const [posts, setPosts] = useState([]);
  const [room, setRoom] = useState("1");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const userProfile = AuthService.getProfile();
      console.log("chat", userProfile);
      setUser(userProfile);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const joinRoom = () => {
      if (room !== "") {
        socket.emit("join_room", room);
      }
    };
    joinRoom();
  }, [room, socket]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Received message:", data.message);
      setPosts((prevPosts) => [...prevPosts, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const sendMessage = (message) => {
    socket.emit("send_message", {
      message,
      room,
      user: { name: user.data.username, avatar: "" },
    });
  };

  return (
    <main className="pl-[17.75rem] p-8 flex flex-col gap-8 h-screen justify-end w-screen">
      <Question room={room} />
      <div className="flex flex-col gap-4">
        {posts.map((post, i) => (
          <Post
            key={i}
            user={user.data.username}
            message={{ user: user.data.username, message: post.message }}
          />
        ))}
      </div>
      {AuthService.loggedIn() ? (
        <MessageInput sendMessage={sendMessage} />
      ) : (
        <MessageInput sendMessage={sendMessage} disabled={true} />
      )}
    </main>
  );
}
