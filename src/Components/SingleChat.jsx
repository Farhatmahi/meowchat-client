import React, { useContext } from "react";
import { ChatContext } from "../Context/ChatProvider";
import Welcome from "./Welcome";

const SingleChat = () => {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
  return <>{selectedChat ? <></> : <Welcome />}</>;
};

export default SingleChat;
