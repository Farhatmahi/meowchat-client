import React from 'react';

const Welcome = () => {
    return (
        <div className='flex justify-center items-center flex-col w-full h-[75vh]'>
            <iframe title='abc' src="https://embed.lottiefiles.com/animation/67524"></iframe>
            <h1 className='text-3xl'>Welcome to <span className='text-accent font-semibold'>MeowChat</span></h1>
            <p>Select a chat to start texting</p>
        </div>
    );
};

export default Welcome;