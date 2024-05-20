import React from 'react';
import { removeToken } from '../../auth/authService';
import { useNavigate }  from "react-router-dom";

const LogoutNavBar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <div className='bg-white py-3 px-8'>
      <button 
        className=" min-w-72 bg-blue-950 min-h-11 text-white text-lg rounded-lg font-sans float-right"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutNavBar;
