import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatProvider";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import { getSender } from "../Config/ChatLogics";


const MyChats = () => {
  const [loggedUser, setloggedUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);
  

  // console.log(selectedChat);

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await axios.get(`http://localhost:4000/chat`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setChats(data);
    };

    const user = JSON.parse(localStorage.getItem('user'))
    setloggedUser(user);
    fetchChats();
    
  }, [setChats]);


  console.log(selectedChat)

  // console.log(chats);
  // console.log(loggedUser)


  return (
    <div
      className={`${
        selectedChat ? "hidden" : "flex"
      } md:flex flex-col w-full md:w-[31%] bg-black pt-4 px-4 h-screen`}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="ml-2 font-semibold text-xl">My Chats</h1>
        <button className="btn btn-accent">
          New Group
          <AiOutlineUsergroupAdd className="inline ml-2" />
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        {chats.map((chat) => (
          <span className={`${selectedChat===chat ? "bg-accent text-black" : "bg-base-100"} p-4 rounded-2xl transition duration-300`} key={chat._id} onClick={() => setSelectedChat(chat)}>
            {!chat.isGroupChat ? getSender(loggedUser, chat.users) : (chat.chatName)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MyChats;
