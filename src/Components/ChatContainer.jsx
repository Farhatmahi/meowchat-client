import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import Chatbox from './Chatbox';
import MyChats from './MyChats';

const ChatContainer = () => {
    const {user} = useContext(AuthContext)
    const [fetchAgain, setFetchAgain] = useState(false)
        
    return (
        
        <div className="flex w-full h-[100vh]">
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </div>
    );
};

export default ChatContainer;