// pages/Dashboard.jsx
import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";


const Dashboard = () => {

  const navigate = useNavigate();
  const {companyData ,setCompanyData ,setCompanyToken} =useContext(AppContext)

const logout = ()=>{
  setCompanyToken(null);
  setCompanyData(null);
  localStorage.removeItem('companyToken');
  navigate('/');

}

useEffect(() =>{
  if (companyData) {
    navigate('/dashboard/manage-jobs');

  }
},[])

  return (
    <div className="min-h-screen">

      {/* Navbar for Recruiter Panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">

          {/* Logo */}
          <img onClick={() => navigate('/')}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt="logo"
          />

            {companyData && (
               <div className="flex items-center gap-2">  
          {/* Right section */}
          <div className="flex items-center gap-3">
           

            {/* Welcome message */}
            <p className="max-sm:hidden">Welcome, {companyData.name}</p>

            {/* Profile with dropdown */}
            <div className="relative group">
              {/* Profile icon */}
              <img
                className="w-8 border rounded-full cursor-pointer"
                src={companyData.image || assets.profile_icon}
                alt="Profile"
              />

              {/* Dropdown menu (visible on hover of parent or itself) */}
              <div className="absolute top-10 right-0 z-10 bg-white rounded-md border text-sm shadow-md w-32 hidden group-hover:block group-focus-within:block">
                <ul className="p-2">
                  <li onClick={logout} className="py-1 px-3 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
            </div>
          </div>
            )}
           

          
        </div>
      </div>
      

      {/* Main dashboard content */}
      
      <div className="flex items-start">
        <div className="inline-block min-h-screen border-r-2">
          <ul className="flex flex-col  items-start gap-2 pt-5 text-gray-800">

            <NavLink  className={({isActive}) => `flex items-center p-2 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && "text-blue-500 border-r-4 border-blue-400"}`} to={"/dashboard/add-job"}>
            <img className="min-w-4" src={assets.add_icon} alt="" />

            <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center p-2 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && "text-blue-500 border-r-4 border-blue-400"}`} to={"/dashboard/manage-jobs"}>
            <img className="min-w-4" src={assets.home_icon} alt="" />
            <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink className={({isActive}) => `flex items-center p-2 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && "text-blue-500 border-r-4 border-blue-400"}`} to={"/dashboard/view-applications"}>
            <img className="min-w-4" src={assets.person_tick_icon} alt="" />
            <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div>
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
