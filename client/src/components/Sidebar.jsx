import React from "react";
import logo from "../assets/logo.svg";

export default function Sidebar() {
  // get user info

  return (
    <div className="h-screen w-[250px] fixed flex flex-col justify-between p-4 pb-8 bg-bgSecondary border-r border-border">
      <h1 className="text-4xl font-bold tacking-tight flex items-center gap-2">
        <img src={logo} alt="Tweeter logo" />
        Tweeter
      </h1>
      {/* Make it get the user's info */}
      <div className="flex gap-2 bg-interactive p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transiton-all duration-300">
        <div className="w-[50px] h-[50px] bg-primary rounded-full"></div>
        <div className="flex flex-col">
          <h2 className="font-bold">Owen Kanzler</h2>
          <span className="text-textSecondary text-sm">oj.kanz1@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
