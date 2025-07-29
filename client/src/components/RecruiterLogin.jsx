import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const RecruiterLogin = () => {
  // State to switch between Login and Register
  const [state, setState] = useState('Login');

  // Input field states
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(false);

  // Context to control visibility of modal
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);

  if (!showRecruiterLogin) return null;

useEffect(() => {
  document.body.style.overflow   = 'hidden' 
  return () => {
    document.body.style.overflow = 'unset' // Reset overflow when component unmounts;
  }
},[]);


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 px-4">
      <form
        className="relative bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md space-y-5"
        onSubmit={(e) => e.preventDefault()} // Prevent form refresh
      >
        {/* Close icon */}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
          src={assets.cross_icon}
          alt="Close"
        />

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Recruiter {state}
        </h1>
        <p className="text-sm text-gray-600 text-center">
          Welcome! Please {state === 'Login' ? 'sign in' : 'sign up'} to continue.
        </p>

        {/* Image Upload - Register only */}
        {state !== 'Login' && (
          <div className="flex justify-center">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Upload"
              className="w-16 h-16 object-cover rounded-full cursor-pointer border-2 border-dashed border-gray-300"
              onClick={() => document.getElementById('fileInput').click()}
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        )}

        {/* Company Name - Register only */}
        {state !== 'Login' && (
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
            <img src={assets.person_icon} alt="person" className="w-5 h-5 mr-2" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Company Name"
              required
              className="w-full outline-none text-sm"
            />
          </div>
        )}

        {/* Email Input */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
          <img src={assets.email_icon} alt="email" className="w-5 h-5 mr-2" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
          <img src={assets.lock_icon} alt="lock" className="w-5 h-5 mr-2" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Forgot Password - Login only */}
        {state === 'Login' && (
          <p className="text-sm text-blue-500 cursor-pointer hover:underline text-right">
            Forgot Password?
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {state === 'Login' ? 'Login' : 'Register'}
        </button>

        {/* Toggle Login/Register */}
        <p className="text-center text-sm">
          {state === 'Login' ? (
            <>
              Don't have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setState('Register')}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setState('Login')}
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default RecruiterLogin;
