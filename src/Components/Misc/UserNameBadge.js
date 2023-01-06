import React from "react";

const UserNameBadge = ({ user, handleFunction }) => {
  return (
    <div className="badge bg-primary gap-2 mr-2">
      <svg onClick={handleFunction}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-4 h-4 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>

      {user.username}
    </div>
  );
};

export default UserNameBadge;
