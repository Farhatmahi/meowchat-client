import axios from "axios";
import React, { useContext, useState } from "react";
import { ChatContext } from "../Context/ChatProvider";

const MyChats = () => {
  const [loggedUser, setloggedUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/chat`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setChats(data)
      

    } catch (error) {}
  };

  return <div>MyChats</div>;
};

export default MyChats;
