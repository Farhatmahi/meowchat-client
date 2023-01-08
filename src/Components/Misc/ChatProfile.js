import React from "react";

const ChatProfile = ({ chatUser }) => {
  // console.log(chatUser)
  return (
    <div className="">
      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative flex flex-col items-center justify-center ">
          <label
            htmlFor="my-modal-7"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="avatar mb-8">
            <div className="w-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
              <img src={chatUser?.users[1]?.image} alt="user_photo" />
            </div>
          </div>
          <h1 className="font-bold">{chatUser?.users[1]?.username}</h1>
          <h2 className="text-gray-500">{chatUser?.users[1]?.email}</h2>
          <div className="modal-action"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatProfile;
