import React from "react";

export default function Post({ user, message }) {

  return (
    <div className="flex gap-2">
      {/* user profile pic */}
      {/* <img
        src={props.user.avatar}
        alt={`${props.user.name}'s avatar`}
        className="h-[50px] w-[50px]"
      /> */}
      {/* placeholder profile pic */}
      <div>
        <div className="w-[50px] h-[50px] bg-primary rounded-full"></div>
      </div>
      <div className="flex flex-col gap-1">
        {/* user name */}
        <h3 className="font-bold flex gap-2 items-center">{user}</h3>
        {/* user message */}
        <p className="text-text2">{message.message}</p>
      </div>
    </div>
  );
}
