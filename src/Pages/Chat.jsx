import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { ChatContext } from '../Context/ChatProvider';
import SideDrawer from '../Components/Misc/SideDrawer';
import MyChats from '../Components/MyChats';
import Chatbox from '../Components/Chatbox';

const Chat = () => {
    // const {user, setUser} = useContext(ChatContext)
    const {user} = useContext(AuthContext)
    return (
        <div className='h-screen overflow-hidden'>
            {user && <SideDrawer></SideDrawer>}
        </div>
    );
};



export default Chat;