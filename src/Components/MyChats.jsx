import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatProvider";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import { getSender, getSenderImage } from "../Config/ChatLogics";
import GroupChatModal from "./Misc/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setloggedUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats, user } =
    useContext(ChatContext);

  const [modalOpen, setModalOpen] = useState(false);

  // console.log(selectedChat);
  console.log(user.username, user.token);

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await axios.get(`http://localhost:4000/chat`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      setChats(data);
    };

    const user = JSON.parse(localStorage.getItem("user"));
    setloggedUser(user);
    fetchChats();
  }, [setChats, fetchAgain]);

  return (
    <div
      className={`${
        selectedChat ? "hidden" : "flex"
      } md:flex flex-col w-full md:w-[25%] bg-black pt-4 md:pt-10 px-4 flex-col-cgrow`}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="ml-2 font-semibold text-xl">My Chats</h1>
        <label
          onClick={() => setModalOpen(true)}
          htmlFor="my-modal-3"
          className="btn btn-accent"
        >
          New Group
          <AiOutlineUsergroupAdd className="inline ml-2" />
        </label>
      </div>
      <div className="flex flex-col space-y-2">
        {chats.map((chat) => (
          <div
            className={`${
              selectedChat === chat ? "bg-accent text-black" : "bg-base-100"
            } p-4 rounded-2xl transition duration-300`}
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
          >
            <img
              src={
                !chat.isGroupChat
                  ? getSenderImage(loggedUser, chat.users)
                  : "https://i.ibb.co/C1NKnQ8/20-group-avatar-icons-2-modified.png"
              }
              className="w-10 rounded-3xl inline mr-4"
              alt=""
            />
            <h1 className="inline text-sm md:text-lg">
              {!chat.isGroupChat
                ? getSender(loggedUser, chat.users)
                : chat.chatName}
            </h1>
          </div>
        ))}
        {chats.length === 0 && (
          <p className="text-gray-500 text-center">No chats </p>
        )}
      </div>
      {modalOpen && <GroupChatModal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default MyChats;
