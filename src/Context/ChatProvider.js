import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [selectedChat, setSelectedChat] = useState()
  const [chats, setChats] = useState([])
  

  useEffect(() => {
    const userInfo = JSON.parse(
      localStorage.getItem("user")
    );
    setUser(userInfo)
  }, []);


  return (
    <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
