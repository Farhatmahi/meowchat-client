import React from "react";
import { RxCross1 } from "react-icons/rx";

const UserNameBadge = ({ user, handleFunction }) => {
  return (
    <div className="badge bg-primary gap-2 mr-2">
      <RxCross1 onClick={handleFunction} />
      {user.username}
    </div>
  );
};

export default UserNameBadge;
