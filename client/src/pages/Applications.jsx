import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer'

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 min-h-[65vh] 2xl:px-20 my-10">
        <h2 className="text-xl font-semibold mt-5">Your Applications</h2>

        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center cursor-pointer" htmlFor="resumeupload">
                <p className="bg-blue-100 text-blue-500 px-4 py-2 rounded-lg mr-2">
                  Select Resume
                </p>
                <input
                  id="resumeupload"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />
                <img src={assets.profile_upload_icon} alt="Upload Icon" />
              </label>
              <button
                className="bg-green-100 border border-green-500 text-green-500 px-4 py-2 rounded-lg"
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                href={resume ? URL.createObjectURL(resume) : "#"}
                className="bg-blue-100 text-blue-500 px-4 py-2 rounded-lg mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="bg-sky-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-lg font-semibold mb-4">Jobs Applied</h2>
        <table className="w-full border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Company</th>
              <th className="p-3 border">Job Title</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => (
              <tr className="hover:bg-gray-50" key={index}>
                <td className="p-3 border flex items-center gap-2">
                  <img src={job.logo} alt="" className="w-6 h-6 mr-2" />
                  {job.company}
                </td>
                <td className="p-3 border">{job.title}</td>
                <td className="p-3 border">{job.location}</td>
                <td className="p-3 border">{moment(job.date).format('LL')}</td>
                <td className="p-3 border">
                  <span
                    className={`px-4 py-1.5 rounded ${
                      job.status === 'Accepted'
                        ? 'bg-green-100 text-green-700'
                        : job.status === 'Rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      </div>
        <Footer/>
    </>
  );
};

export default Applications;
