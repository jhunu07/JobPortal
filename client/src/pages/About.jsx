import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
   <NavBar/>
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      
      <div className="max-w-6xl mx-auto">
       
        {/* Banner Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About JobPortal</h1>
          <p className="text-lg text-gray-600">
            Connecting talent with opportunity — empowering careers, one job at a time.
          </p>
        </div>

        {/* Image & Mission Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <img
              src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg"
              alt="Job search illustration"
              className="rounded-lg shadow-md w-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="mb-4">
              At <strong>JobPortal</strong>, we believe that everyone deserves access to the right career opportunity. 
              Whether you're a recent graduate, an experienced professional, or a hiring manager looking for talent — our platform bridges that gap.
            </p>
            <p>
              We are not just a job board — we’re a career companion, helping users explore new roles, receive job alerts, and connect with hiring teams across industries.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
              <p>We strive to make job hunting simple, fast, and accessible for everyone — from anywhere.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Transparency</h3>
              <p>Clear job listings, direct applications, and helpful filters empower job seekers and recruiters alike.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Growth</h3>
              <p>We help people build careers — not just find jobs. Personalized alerts, resume tips, and smart AI tools assist every step.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-white shadow-lg rounded-lg p-10">
          <h2 className="text-2xl font-bold mb-4">Ready to take the next step?</h2>
          <p className="text-gray-600 mb-6">
            Join millions of users who trust JobPortal to move their careers forward.
          </p>
    
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AboutUs;
