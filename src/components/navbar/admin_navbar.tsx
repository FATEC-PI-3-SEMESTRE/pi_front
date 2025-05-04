import { useState } from 'react';

export const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Barra lateral - versão fechada */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-16'
        } bg-gray-300 text-black h-[90] transition-all duration-300 border rounded-md mb-10`}
      >
        <div className="flex justify-between items-center p-5">
          <button className="text-black text-2xl" onClick={toggleNavbar}>
            <i className="fa-solid fa-pills"></i>
        </button>
        </div>

        {/* Links do menu */}
        <div className="text-xl flex flex-col gap-5 w-full ml-5">
          <div className="hover:text-gray-400 mr-4 flex items-center">
            <a href="/admin" className="flex items-center">
              <i className="fa-solid fa-house"></i>
              <span className={`${isOpen ? 'block' : 'hidden'} ml-2`}>Home</span>
            </a>
          </div>
          <div className="flex items-center hover:text-gray-400">
            <a href="/admin/user" className="flex items-center">
              <i className="fa-solid fa-users-gear"></i>
              <span className={`${isOpen ? 'block' : 'hidden'} ml-2`}>Usuários</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};