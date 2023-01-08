import React from "react";

const UserListItem = ({userData, handleFunction}) => {
  return (
    <div onClick={handleFunction} className="bg-neutral hover:bg-black ease-in-out transition duration-300 rounded-2xl my-2 pl-4 py-3 flex cursor-pointer ">
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img src={userData.image} alt='user_img' />
        </div>
      </div>
      <div className="ml-2 flex flex-col justify-center">
        <h1>{userData.username}</h1>
        <p className="text-xs text-gray-500">{userData.email}</p>
      </div>
    </div>
  );
};

export default UserListItem;
