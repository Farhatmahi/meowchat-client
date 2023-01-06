import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import Chatbox from './Chatbox';
import MyChats from './MyChats';

const ChatContainer = () => {
    const {user} = useContext(AuthContext)

    
    
    return (
        
        <div className="flex w-full h-[100vh]">
                {user && <MyChats></MyChats>}
                {user && <Chatbox></Chatbox>}
            </div>
    );
};

export default ChatContainer;