import React, { useState } from "react";
import arrow from "../assets/arrow.svg";
import EmojiPicker from "emoji-picker-react";
import emoji from "../assets/emoji.svg";

const MessageInput = ({ sendMessage, disabled }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    sendMessage(message);
    setMessage("");
    setShowEmojiPicker(false);
  };

  const handleEmojiSelect = (emoji, emojiObject) => {
    console.log("emojiObject:", emojiObject);
    setMessage(message + (emojiObject.emoji));
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

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
            placeholder="Login to get your Tweeter on!"
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
            type="button"
            onClick={toggleEmojiPicker}
            className="bg-transparent p-2 rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out"
            >
              <img src={emoji} alt="emoji" />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-28 right-6 z-10">
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </div>
          )}
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
