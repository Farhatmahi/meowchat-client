import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import Chatbox from './Chatbox';
import MyChats from './MyChats';

const ChatContainer = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className="flex justify-between w-full p-10">
                {user && <MyChats></MyChats>}
                {user && <Chatbox></Chatbox>}
            </div>
    );
};

export default ChatContainer;