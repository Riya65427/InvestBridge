import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StartupDashboard = () => {
  const [startups, setStartups] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();
 const fetchStartups = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/startup/list");
      if (!response.ok) throw new Error("Failed to fetch startups");
      const data = await response.json();
      setStartups(data);
    } catch (error) {
      console.error("Error fetching startups:", error);
    }
  };
const handleDelete = async (startupId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this startup?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/startup/${startupId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");
setStartups(startups.filter((startup) => startup._id !== startupId));
      toast.success("Startup deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting startup:", error);
      toast.error("Error deleting startup. Try again.", { position: "top-right" });
    }
  };
useEffect(() => {
    fetchStartups();
  }, []);

  const filteredStartups = startups.filter((startup) =>
    startup.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
return (
    <div className="container mt-4">
      <h3>Welcome Startup Founders & Investors!</h3>
      <p>Find startups based on your investment interests.</p>
      <button onClick={() => navigate("/submit-startup")} className="btn btn-primary mb-3">
        Post your startup idea on InvestBridge
      </button>

      {/*Search Bar for Investors */}
      <input
  type="text"
  placeholder=" Search by category "
  className="form-control mb-3 custom-search-bar"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
<div>
        {filteredStartups.length === 0 ? (
          <p className="text-muted">No startups found in this category.</p>
        ) : (
          filteredStartups.map((startup) => (
            <div key={startup._id} className="card p-3 mt-3 shadow-sm">
              <h5>{startup.name}</h5>
              <p><strong>Description:</strong> {startup.description}</p>
              <p><strong>Budget:</strong> {startup.budget}</p>
              <p><strong>Category:</strong> {startup.category}</p>
              <p><strong>Contact Number:</strong> {startup.contactNumber}</p>
              <p><strong>Email:</strong> {startup.email}</p>
              <button onClick={() => handleDelete(startup._id)} className="btn btn-danger mt-2">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default StartupDashboard;