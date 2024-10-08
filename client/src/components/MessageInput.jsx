import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import emoji from "../assets/emoji.svg";
import { ADD_POST } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Send } from "lucide-react";
import Filter from "bad-words";

const MessageInput = ({ sendMessage, disabled, userId }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const filter = new Filter();

  const [addPost, { error, loading, data }] = useMutation(ADD_POST); //

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    console.log(userId);

    const filteredMessage = filter.clean(message);

    await addPost({
      variables: {
        comment: filteredMessage,
        profileId: userId,
      },
    });
    sendMessage(filteredMessage);
    setMessage("");
    setShowEmojiPicker(false);
    // message timeout
    const btn = document.getElementById("submitBtn");
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled = false;
    }, 1000);
  };

  const handleEmojiSelect = (emoji, emojiObject) => {
    console.log("emojiObject:", emojiObject);
    setMessage(message + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex gap-6 bg-interactive py-4 px-6 rounded-lg border border-border h-[70px]"
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
          <button type="button" onClick={toggleEmojiPicker} className="">
            <img src={emoji} alt="emoji" />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-28 right-8 z-10">
              <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                pickerStyle={{ boxShadow: "0" }}
              />
            </div>
          )}
          <button type="submit" className="" id="submitBtn">
            <Send className="hover:text-primary transition-all duration-300" />
          </button>
        </>
      )}
    </form>
  );
};

export default MessageInput;
