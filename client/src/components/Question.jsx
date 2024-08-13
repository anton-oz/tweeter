import { useQuery } from "@apollo/client";
import { useState, useEffect, useCallback } from "react";
import { GET_QUESTION } from "../utils/queries";
import logo from "../assets/logo.svg";

import { useSocketContext } from "../context/SocketContext";

export default function Question({ room }) {
  const socket = useSocketContext();

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("set_question", ({ question }) => {
      setCurrentQuestion(question);
    });

    return () => {
      socket.off("set_question");
    };
  }, [socket]);

  useEffect(() => {
    // timeout to wait for user to connect to server
    setTimeout(() => {
      socket.emit("get_question", {
        room,
      });
      setLoading(false);
    }, 500);
  }, [socket]);

  return (
    <div className="mb-auto mx-auto mt-20 py-4 px-6 bg-interactive border border-border rounded-lg">
      <h1 className="flex gap-4 items-center font-bold text-lg">
        <img src={logo} alt="logo" />
        {loading ? "loading..." : currentQuestion ? currentQuestion : "error"}
      </h1>
    </div>
  );
}
