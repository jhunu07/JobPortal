import React, {  useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { JobCategories, JobLocations } from '../assets/assets';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Banglore");
  const [category, setCategory] = useState("Programming");
  const [salary, setSalary] = useState("");
  const [level, setLevel] = useState("Beginner level");

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl ,companyToken} = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(backendUrl + '/api/company/post-job',
        {
          title,
          description,
          location,
          category,
          salary,
          level
        },
        { headers: { token: companyToken } }
      );
if (data.success) {
        toast.success(data.message)
        setTitle("");
        setSalary("");
        quillRef.current.root.innerHTML = "";       
}else{
  toast.error(data.message)
}

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Type here",
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className='container p-4 flex flex-col gap-3 w-full '>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-gray-700">Job Title</p>
        <input
          type="text"
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder="Type here"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-gray-700">Job Description</p>
        <div ref={editorRef} className="bg-white border border-gray-300 rounded-md min-h-[150px]"></div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Job Category</p>
          <select
            onChange={e => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Job Location</p>
          <select
            onChange={e => setLocation(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Job Level</p>
          <select
            onChange={e => setLevel(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Salary</p>
          <input
            onChange={e => setSalary(e.target.value)}
            type="number"
            min={0} placeholder='0'
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-blue-400 text-white rounded"
      >
        ADD
      </button>
    </form>
  );
};

export default AddJob;
