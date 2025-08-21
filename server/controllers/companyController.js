import Company from "../models/Company.js";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from '../models/JobApplication.js'; 


// Register a company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({ success: false, message: "Company already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: req.file ? req.file.path : null
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image
      },
      token: generateToken(company._id)
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Registration failed" });
  }
};

// Login a company
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if request body has required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find company by email
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Generate JWT token
    const token = generateToken(company._id);
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Token generation failed",
      });
    }

    // 5. Return response
    return res.status(200).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image || null,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

// get company data
export const getCompanyData = async (req, res) => {

  try {
    const company = req.company;

    res.json({ success: true, company });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

// post job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category

    })
    await newJob.save();
    res.json({
      success: true,
      job: newJob
    });
  } catch (error) {
    res.json({
      success: false,

    });

  }



};

// get company job applicant
export const getCompanyJobApplicants = async (req, res) => { };

// get company posted job
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId })

    //adding no of applicant info
    const jobsData = await Promise.all(jobs.map(async (job) => {
      const applicants = await JobApplication.find({ jobId: job._id });
      return { ...job.toObject(), applicants: applicants.length };
    }))



    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

// change job application status
export const ChangeJobApplicationsStatus = (req, res) => {
  // your logic here
};

// manage visibility
export const changeVisiblity = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;
    const job = await Job.findById(id);


    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;

    }
    await job.save();

    res.json({ success: true, job });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });

  }
};

