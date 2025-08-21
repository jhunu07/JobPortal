import React from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplications = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 text-sm border-b">#</th>
              <th className="text-left p-2 text-sm border-b">User Name</th>
              <th className="text-left p-2 text-sm border-b">Job Title</th>
              <th className="text-left p-2 text-sm border-b">Location</th>
              <th className="text-left p-2 text-sm border-b">Resume</th>
              <th className="text-left p-2 text-sm border-b">Application</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 text-sm">{index + 1}</td>
                <td className="p-2 flex items-center gap-2 text-sm">
                  <img src={applicant.imgSrc} alt="" className="h-8 w-8 rounded-full object-cover" />
                  <span>{applicant.name}</span>
                </td>
                <td className="p-2 text-sm">{applicant.jobTitle}</td>

                <td className="p-2 text-sm">{applicant.location}</td>

            {/* for resume section */}
                  <td className=" ">
                    <a href="#" target="_blank"
                    className='bg-blue-100 text-blue-400 px-3 py-1 rounded inline-flex gap-2  '>
                      Resume <img src={assets.resume_download_icon} alt="" className="" />
                    </a>
                  </td>


                {/* for application section  */}
                <td className="py-2  px-4  border-b relative">
                  <div className="relative inline-block text-left group">
                    <button className="text-gray-500 action-button">...</button>


                    <div className=" z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border-gray-200 rounded shadow group-hover:block">
                      <button className=" block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-400 ">Accept</button>
                      <button className=" block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-400 ">Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
