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
          <div key={m._id} className="w-full flex">
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
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
              }}
              className={`chat  ${
                m?.sender?._id === user?._id
                  ? "chat-end"
                  : "chat-start inline-block w-[70%]"
              } `}
            >
              <div
                className={`chat-bubble  ${
                  m?.sender?._id === user?._id ? "bg-primary" : "bg-[#16171B]"
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
