import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const ProfileModal = ({ user }) => {
  // console.log(user);
  return (
    <div className="">
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative flex flex-col items-center justify-center ">
          <label
            htmlFor="my-modal-6"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="avatar mb-8">
            <div className="w-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
              <img src={user.photoURL} alt="user_photo" />
            </div>
          </div>
          <h1 className="font-bold">{user.displayName}</h1>
          <h2 className="text-gray-500">{user.email}</h2>
          <div className="modal-action"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
