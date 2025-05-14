import React from 'react';

const AuthSwitcher = ({ isAdmin, toggleAuth }) => {
  return (
    <div className="flex justify-end mb-6">
      <div className="bg-white p-2 rounded-full shadow-md">
        <button
          onClick={toggleAuth}
          className={`px-4 py-2 rounded-full transition-colors ${
            isAdmin 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {isAdmin ? 'Modo Administrador' : 'Modo Usuario'}
        </button>
      </div>
    </div>
  );
};

export default AuthSwitcher;