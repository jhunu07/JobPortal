import React from 'react';
import { assets, manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
const navigate  = useNavigate()

  return (
    <div className='container p-4 max-w-5xl mx-auto'>
      <div className='overflow-x-auto'>
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">#</th>
              <th className="p-3 border-b text-left">JOB TITLE</th>
              <th className="p-3 border-b text-left">DATE</th>
              <th className="p-3 border-b text-left">LOCATION</th>
              <th className="p-3 border-b text-left">APPLICANT</th>
              <th className="p-3 border-b text-left">VISIBLE</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{job.title}</td>
                <td className="p-3">{moment(job.date).format('ll')}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">{job.applicants}</td>
                <td className="p-3">
                  <input type="checkbox" className="h-4 w-4 accent-blue-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4  justify-end'>
        <button  onClick  ={() =>navigate('/dashboard/add-job')}
        className='bg-blue-500 rounded text-white p-2'> ADD NEW JOB</button>
      </div>
    </div>
  );
};

export default ManageJobs;
