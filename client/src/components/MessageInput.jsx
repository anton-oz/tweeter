import React, { useState } from "react";
import arrow from "../assets/arrow.svg";

const MessageInput = ({ sendMessage, disabled }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    sendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex gap-4 bg-interactive py-4 px-6 rounded-lg border border-border"
    >
      {disabled ? (
        <>
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message according to the topic"
            className="w-full bg-transparent focus:outline-none"
            disabled
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </form>
  );
};

export default MessageInput;
