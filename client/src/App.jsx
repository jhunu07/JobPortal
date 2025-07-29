import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { AppContext } from "./context/AppContext";
import RecruiterLogin from "./components/RecruiterLogin";
import Dashboard from "./pages/Dashboard";
import ManageJobs from "./pages/ManageJobs";
import AddJob from "./pages/AddJob";
import ViewApplications from "./pages/ViewApplications";


const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);
  return (
    <>
      <div>
        {showRecruiterLogin && <RecruiterLogin />}
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/dashboard" element={<Dashboard />} >
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="view-applications" element={<ViewApplications />} />
          </Route>

        </Routes>
      </div>
    </> 
  );
};

export default App;
