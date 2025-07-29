import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const NavBar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate(`/`)}
          className="cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/applications">Applied job</Link>
            <p>|</p>
            <p className="max-sm:hidden">Hi, {user.firstName + ' ' + user.lastName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-5 max-sm:text-xs">
            <button
              onClick={() => setShowRecruiterLogin(true)} // ✅ FIXED CALLBACK
              className="text-gray-600"
            >
              Recruiter Login
            </button>
            <button
              className="bg-blue-500 text-white px-7 py-2 rounded-full"
              onClick={openSignIn}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
