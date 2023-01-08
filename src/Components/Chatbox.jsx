import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";
import { MdArrowBack } from "react-icons/md";

import { CgProfile } from "react-icons/cg";
import ChatProfile from "./Misc/ChatProfile";
import GroupChatProfile from "./Misc/GroupChatProfile";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat } = useContext(ChatContext);

  // console.log(selectedChat);

  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } md:flex bg-[#1D1E24] md:mx-8 flex-grow flex-col md:mt-8 md:rounded-t-3xl`}
    >
      {selectedChat && (
        <div className="navbar bg-black md:rounded-t-3xl px-4 flex justify-between">
          <button
            onClick={() => setSelectedChat("")}
            className="block md:hidden mr-4 bg-primary p-2 rounded-xl"
          >
            <MdArrowBack />
          </button>
          <div className="w-3/4">
            <div className="avatar">
              <div className="w-10 rounded-full">
                {!selectedChat?.isGroupChat ? (
                  <img src={selectedChat?.users[1]?.image} alt="" />
                ) : (
                  <img
                    src="https://i.ibb.co/C1NKnQ8/20-group-avatar-icons-2-modified.png"
                    alt=""
                  />
                )}
              </div>
            </div>
            <h1 className="text-sm font-normal md:text-lg ml-4">
              {selectedChat?.isGroupChat
                ? selectedChat?.chatName
                : selectedChat?.users[1].username}
            </h1>
          </div>
          <div className="w-full flex justify-end">
            <label htmlFor="my-modal-7" className=" bg-primary p-2 rounded-xl">
              <CgProfile />
            </label>
          </div>
        </div>
      )}
      <SingleChat fetchAgain={fetchAgain} selectedChat={setFetchAgain} />
      {!selectedChat?.isGroupChat && selectedChat ? (
        <ChatProfile chatUser={selectedChat} />
      ) : (
        <GroupChatProfile
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      )}
    </div>
  );
};

export default Chatbox;
