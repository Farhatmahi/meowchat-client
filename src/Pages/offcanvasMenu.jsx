import React, { useState } from 'react';

const OffcanvasMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-gray-800">
      <div className="hidden sm:flex sm:items-center sm:justify-end">
        <button
          onClick={handleToggle}
          className="text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          Menu
        </button>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800">
          <div className="py-4 text-center">
            <a className="text-white font-bold block p-2 rounded-full hover:bg-gray-700" href="/">Home</a>
            <a className="text-white font-bold block p-2 rounded-full hover:bg-gray-700" href="/about">About</a>
            <a className="text-white font-bold block p-2 rounded-full hover:bg-gray-700" href="/contact">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasMenu;
