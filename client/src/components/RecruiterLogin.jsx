// RecruiterLogin.jsx
import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecruiterLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('Login'); // "Login" or "Register"

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const { backendUrl, setShowRecruiterLogin, setCompanyToken, setCompanyData } = useContext(AppContext);

  const saveAuthData = (token, company) => {
    setCompanyToken(token);
    setCompanyData(company);
    localStorage.setItem('companyToken', token);
    localStorage.setItem('companyData', JSON.stringify(company));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Login') {
        const { data } = await axios.post(`${backendUrl}/api/company/login`, { email, password });
        if (data?.success) {
          saveAuthData(data.token, data.company);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
        } else {
          toast.error(data?.message || 'Login failed');
        }
        return;
      }

      // Register
      const formData = new FormData();
      if (image) formData.append('image', image);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

      const { data } = await axios.post(`${backendUrl}/api/company/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data?.success) {
        saveAuthData(data.token, data.company);
        setShowRecruiterLogin(false);
        navigate('/dashboard');
      } else {
        toast.error(data?.message || 'Registration failed');
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        'Something went wrong';
      toast.error(message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 px-4">
      <form
        className="relative bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md space-y-5"
        onSubmit={onSubmitHandler}
      >
        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
          src={assets.cross_icon}
          alt="Close"
        />

        <h1 className="text-2xl sm:text-3xl font-bold text-center">Recruiter {state}</h1>
        <p className="text-sm text-gray-600 text-center">
          Welcome! Please {state === 'Login' ? 'sign in' : 'sign up'} to continue.
        </p>

        {state !== 'Login' && (
          <>
            <div className="flex justify-center">
              <img
                src={image ? URL.createObjectURL(image) : assets.profile_upload_icon}
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
          </>
        )}

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

        {state === 'Login' && (
          <p className="text-sm text-blue-500 cursor-pointer hover:underline text-right">Forgot Password?</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {state === 'Login' ? 'Login' : 'Register'}
        </button>

        <p className="text-center text-sm">
          {state === 'Login' ? (
            <>
              Don&apos;t have an account?{' '}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => setState('Register')}>
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => setState('Login')}>
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
