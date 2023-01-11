import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatProvider";
import Loader from "./Misc/Loader";
import Welcome from "./Welcome";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";

const SingleChat = () => {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage) {
      try {
        setNewMessage("");
        const { data } = await axios.post(
          "https://chat-farhatmahi.vercel.app/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          {
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        console.log(data);

        setMessages([...messages, data]);
      } catch (error) {
        toast.error("An error occured", {
          style: {
            padding: "16px",
            backgroundColor: "#5853d5",
            color: "#FFFFFF",
          },
        });
      }
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://chat-farhatmahi.vercel.app/message/${selectedChat._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setMessages(data)
      console.log(messages)
      setLoading(false)
    } catch (error) {
      toast.error("An error occured", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
    }
  };

  useEffect(() => {
    fetchMessages()
  }, [selectedChat])

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {!selectedChat ? (
        <Welcome />
      ) : (
        <>
          {loading ? (
            <div className="flex h-full justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              Messages will show here
            </div>
          )}
          <form
            // onKeyDown={sendMessage}
            onSubmit={sendMessage}
            className="flex items-center bg-[#16171b] py-2 m-4 rounded-2xl px-4"
          >
            <input
              className="appearance-none bg-transparent border-none w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Type your message here"
              onChange={typingHandler}
              value={newMessage}
            />
            <button
              className="flex-shrink-0 mx-3 text-sm text-white rounded-xl"
              type="button"
            >
              <BsEmojiSmile className="text-xl" />
            </button>
            <button
              className="flex-shrink-0 bg-accent text-sm text-black p-2 rounded-xl"
              type="submit"
            >
              <IoPaperPlaneOutline className="text-lg" />
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default SingleChat;
