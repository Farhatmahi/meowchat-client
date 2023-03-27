import React, { useContext } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
} from "../Config/ChatLogics";
import { ChatContext } from "../Context/ChatProvider";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  const { user } = useContext(ChatContext);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          
            <div key={m._id} className='w-full'>
              {(isSameSender(messages, m, i, user?._id) ||
                isLastMessage(messages, i, user?._id)) && (
                <div className="inline-block">
                  <div className="tooltip" data-tip={m.sender.username}>
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={m.sender.image} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <span
                className={`chat ml-[${isSameSenderMargin(messages, m, i, user._id)}px] ${
                  m?.sender?._id === user?._id ? "chat-end" : "chat-start inline-block w-[70%]" 
                } `}
              >
                <div
                  className={`chat-bubble  ${
                    m?.sender?._id === user?._id ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  {m.content}
                </div>
              </span>
            </div>
          
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
