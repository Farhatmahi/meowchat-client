import axios from "axios";
import React, { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { ChatContext } from "../../Context/ChatProvider";
import Loader from "./Loader";
import UserListItem from "./UserListItem";
import UserNameBadge from "./UserNameBadge";

const GroupChatProfile = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
}) => {
  const { user } = useContext(ChatContext);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // console.log(selectedChat);

  const handleRemove = async (selectedUser) => {
    // if (selectedUser._id === user._id) {
    //   toast.error("You cannot remove yourself from the group", {
    //     style: {
    //       padding: "16px",
    //       backgroundColor: "#5853d5",
    //       color: "#FFFFFF",
    //     },
    //   });
    //   return;
    // }
    try {
      const { data } = await axios.put(
        "http://localhost:4000/chat/groupRemove",
        {
          chatId: selectedChat._id,
          userId: selectedUser._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {}
  };

  const handleRename = async (e) => {
    e.preventDefault();
    if (!groupChatName) {
      return;
    }

    try {
      setRenameLoading(true);

      const { data } = await axios.put(
        "http://localhost:4000/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setSelectedChat(data);
      //   console.log(fetchAgain);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      toast.success("Group renamed!", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });

      // console.log('reached');
    } catch (error) {
      toast.error("An error occured", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:4000/user?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      toast.error("Failed to load the search results", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
    }
  };

  //   console.log(selectedChat);
  //   console.log(user)
  const handleGroup = async (user1, e) => {
    e.preventDefault();
    if (selectedChat.users.find((usr) => usr._id === user1._id)) {
      toast.error("User already added", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
      return;
    }

    if (selectedChat?.groupAdmin?._id !== user._id) {
      toast.error("Only admin can add", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.put(
        "http://localhost:4000/chat/groupAdd",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);
      // } catch (err) {}

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      toast.success(`${user1.username} is added on the group`, {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
    } catch (err) {
      toast.error("An error occured", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
    }

    setSelectedUsers([...selectedUsers, user1]);
  };

  const handleLeave = (user) => {
    handleRemove(user);
  };

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
              <img
                src="https://i.ibb.co/C1NKnQ8/20-group-avatar-icons-2-modified.png"
                alt="group_photo"
              />
            </div>
          </div>
          <h1 className="font-bold">{selectedChat?.chatName}</h1>
          <div className="py-2">
            {selectedChat?.users?.map((user) => (
              <UserNameBadge
                user={user}
                key={user._id}
                handleFunction={() => {
                  console.log("clicked");
                  handleRemove(user);
                }}
              />
            ))}
          </div>

          <div className="flex items-end">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Rename group?</span>
              </label>
              <input
                type="text"
                placeholder="Group name"
                className="input input-bordered w-full"
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
            </div>
            <button
              onClick={handleRename}
              type="submit"
              className="btn btn-accent ml-2"
            >
              Rename
            </button>
          </div>
          <div className="">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Add users</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-80"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col w-80">
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <Loader />{" "}
              </div>
            ) : (
              searchResults
                ?.slice(0, 3)
                .map((userData) => (
                  <UserListItem
                    key={userData._id}
                    userData={userData}
                    handleFunction={(e) => handleGroup(userData, e)}
                  />
                ))
            )}
          </div>

          <button
            onClick={() => handleLeave(user)}
            type="submit"
            className="btn btn-error mt-4 w-80"
          >
            Leave Group
          </button>

          <div className="modal-action"></div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatProfile;
