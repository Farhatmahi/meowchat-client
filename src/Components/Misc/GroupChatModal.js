import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { ChatContext } from "../../Context/ChatProvider";
import Loader from "./Loader";
import UserListItem from "./UserListItem";
import UserNameBadge from "./UserNameBadge";

const GroupChatModal = () => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = useContext(ChatContext);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!groupChatName || !selectedUsers) {
      toast.error("Please fill all of the fields", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
    }

    try {
      const { data } = await axios.post(
        `http://localhost:4000/chat/group`,
        
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
      );

        setChats([data, ...chats])

        toast.success("Group chat created", {
            style: {
              padding: "16px",
              backgroundColor: "#5853d5",
              color: "#FFFFFF",
            },
          });


    } catch (error) {}
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

    //   console.log(data);
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

//   console.log(selectedUsers);
  const handleGroup = (user) => {
    if (selectedUsers.includes(user)) {
      toast.error("User already added", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
      return;
    }

    setSelectedUsers([...selectedUsers, user]);
  };

  const handleDelete = (deleteUser) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== deleteUser._id)
    );
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Create group chat</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is your name?</span>
              </label>
              <input
                type="text"
                placeholder="Group name"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is your name?</span>
              </label>
              <input
                type="text"
                placeholder="Search for users"
                className="input input-bordered w-full max-w-xs mb-4"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
            {/* selected users  */}

            {selectedUsers.map((user) => (
              <UserNameBadge
                user={user}
                key={user._id}
                handleFunction={() => {
                  handleDelete(user);
                }}
              />
            ))}

            {/* render search users  */}
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <Loader />{" "}
              </div>
            ) : (
              searchResults
                .slice(0, 4)
                .map((userData) => (
                  <UserListItem
                    key={userData._id}
                    userData={userData}
                    handleFunction={() => handleGroup(userData)}
                  />
                ))
            )}

            <input
              type="Create"
              className="btn bg-accent hover:bg-[#E9F83F] rounded-2xl text-black"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;
