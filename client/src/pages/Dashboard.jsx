// pages/Dashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  return (
    <div className="min-h-screen">

      {/* Navbar for Recruiter Panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">

          {/* Logo */}
          <img
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt="logo"
          />

          {/* Right section */}
          <div className="flex items-center gap-3">

            {/* Welcome message */}
            <p className="max-sm:hidden">Welcome, GreatStack</p>

            {/* Profile with dropdown */}
            <div className="relative group">
              {/* Profile icon */}
              <img
                className="w-8 border rounded-full cursor-pointer"
                src={assets.company_icon}
                alt="Profile"
              />

              {/* Dropdown menu (visible on hover of parent or itself) */}
              <div className="absolute top-10 right-0 z-10 bg-white rounded-md border text-sm shadow-md w-32 hidden group-hover:block group-focus-within:block">
                <ul className="p-2">
                  <li className="py-1 px-3 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main dashboard content */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
