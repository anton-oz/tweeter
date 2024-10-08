import React, { useState, useEffect, useRef } from "react";
import Post from "./Post";
import MessageInput from "./MessageInput";
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../utils/queries";

import Question from "./Question";

export default function TweeterChat({ socket }) {
  const [dbPosts, setDbPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [room, setRoom] = useState("1");
  const [user, setUser] = useState(null);

  // array for post username
  const [postUser, setPostUser] = useState([]);

  // get all posts from db
  const { loading, data, error } = useQuery(GET_POSTS);

  useEffect(() => {
    console.log('posts', posts)
  }, [posts])

  // display posts from db
  useEffect(() => {
    if (data && data.getPosts) {
      console.log(data.getPosts);
      setDbPosts(data.getPosts);
    }
  }, [data]);

  const postsRef = useRef(null);

  useEffect(() => {
    postsRef.current.scrollIntoView({
      block: "end",
    });
  }, [posts, dbPosts]);

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
      setPostUser((prevUsers) => [...prevUsers, data.user.name]);
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
      user: { name: user.data.username, avatar: JSON.parse(user.data.avatar) },
    });
  };

  return (
    <main className="md:pl-[17.75rem] p-2 md:p-8 flex flex-col gap-8 h-screen justify-end w-screen">
      <Question room={room} />
      <div className="overflow-y-auto ">
        {" "}
        {/* Comment Container */}
        <div className="flex flex-col gap-4" ref={postsRef}>
          {dbPosts.map((post, i) => (
            <Post
              key={i}
              user={post.profile.username}
              message={{ message: post.comment }}
              avatar={JSON.parse(post.profile.avatar)}
            />
          ))}
          {posts.map((post, i) => (
            <Post
              key={i}
              user={postUser[i]}
              message={{ user: user?.data.username || 'username error', message: post.message }}
              avatar={post.user.avatar}
            />
          ))}
        </div>
      </div>
      {AuthService.loggedIn() ? (
        <MessageInput
          sendMessage={sendMessage}
          userId={user ? user?.data._id : ""}
        />
      ) : (
        <MessageInput sendMessage={sendMessage} disabled={true} />
      )}
    </main>
  );
}
