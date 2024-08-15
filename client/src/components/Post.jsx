import React from "react";


import AvatarComponent from "./Avatar";

export default function Post({ user, message, avatar }) {

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
        {/* <div className="w-[50px] h-[50px] bg-primary rounded-full"></div> */}
        <AvatarComponent settings={avatar}/>
      </div>
      <div className="flex flex-col gap-1">
        {/* user name */}
        <h3 className="font-bold flex gap-2 items-center">{user}</h3>
        {/* user message */}
        <p className="text-text2" style={{ overflowWrap: "anywhere" }}>
          {message.message}
        </p>
      </div>
    </div>
  );
}
