import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineBell } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { ChatContext } from "../../Context/ChatProvider";
import ChatContainer from "../ChatContainer";
import Loader from "./Loader";
import ProfileModal from "./ProfileModal";
import UserListItem from "./UserListItem";

const SideDrawer = () => {
  const { logout } = useContext(AuthContext);
  const { user, selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleLogout = () => {
    logout()
      .then((result) => {
        toast.success("Logged out");
        navigate("/login");
      })
      .catch((err) => {});
  };

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please enter your friend's name", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://chat-farhatmahi.vercel.app/user?search=${search}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setSearchResult(data);
      console.log(data);
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

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const token = localStorage.getItem("accessToken");

      const { data } = await axios.post(
        `https://chat-farhatmahi.vercel.app/chat`,
        { userId },
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);
      console.log(chats);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast.error("Error fetching the chats", {
        style: {
          padding: "16px",
          backgroundColor: "#5853d5",
          color: "#FFFFFF",
        },
      });
    }
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="w-full navbar border-b-2 border-base-100 h-[10vh]">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-3"
              className="btn bg-[#16171b] rounded-2xl md:px-8 "
              id="my-drawer"
            >
              <CiSearch className="inline md:mr-4" />
              <span className="hidden md:block">Search</span>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">ChatBud</div>
          <div className="flex-none ">
            <div className="flex items-center">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1">
                  <AiOutlineBell className="text-2xl" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link>Item 1</Link>
                  </li>
                  <li>
                    <Link>Item 2</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user?.image} alt="" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="hover:bg-accent hover:text-black">
                    <label htmlFor="my-modal-6">
                      <Link>My Profile</Link>
                    </label>
                  </li>

                  <li className="hover:bg-accent hover:text-black">
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              </div>
              <ProfileModal user={user} />
            </div>
          </div>
        </div>
        {/* <!-- Page content here --> */}
        <ChatContainer />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100">
          <h2 className="text-lg font-bold mb-4">Search users</h2>
          {/* <!-- Sidebar content here --> */}
          <input
            type="text"
            placeholder="Search with name or email"
            className="input input-bordered"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="submit"
            onClick={handleSearch}
            className="btn btn-accent inline my-4 rounded-2xl"
            value="Search"
          />
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <Loader />{" "}
            </div>
          ) : (
            searchResult.map((userData) => (
              <UserListItem
                key={userData._id}
                userData={userData}
                handleFunction={() => accessChat(userData._id)}
              />
            ))
          )}
          {loadingChat && (
            <div className="flex justify-center items-center py-4">
              <Loader />{" "}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideDrawer;
