import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    
    <footer className="bg-[#f7f8fa] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-gray-200">
        
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={assets.logo} alt="logo" className="" />
        
          </div>
          <p className="text-sm text-gray-600 max-w-xs">
            Find your dream job with us. We connect talented people with top companies around the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="#job-list" className="hover:text-blue-600">Jobs</a></li>
            <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm text-gray-600 mb-2">Email: support@jobportal.com</p>
          <p className="text-sm text-gray-600 mb-4">Phone: +1 234 567 890</p>
          <div className="flex gap-4">
            <a href="#"><img src={assets.facebook_icon} alt="Facebook" className="h-6 w-6" /></a>
            <a href="#"><img src={assets.twitter_icon} alt="Twitter" className="h-6 w-6" /></a>
            <a href="#"><img src={assets.linkedin_icon} alt="LinkedIn" className="h-6 w-6" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 text-center py-4 text-sm text-gray-600 border-t border-gray-300">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
};


export default Footer;
