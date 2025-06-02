import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 
import { toast } from 'react-toastify';

const InvestorDashboard = () => {
  const [startups, setStartups] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('You need to be logged in to view startups.');
          return;
        }

        const res = await axios.get('/api/startups', {
          headers: { Authorization: `Bearer ${token}` },
          params: { category: searchCategory } 
        });
        setStartups(res.data);
      } catch (error) {
        console.error("Error fetching startups:", error);
        toast.error("Failed to load startups.");
      }
    };
    fetchStartups();
  }, [searchCategory]); 

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome Investor!</h2>
      <h5 className="mb-4">Discover high-growth startups, manage your investments and connect with promising opportunities.</h5>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search startups by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>

      <h4 className="mb-3">Available Startups:</h4>
      <div className="row">
        {startups.length > 0 ? (
          startups.map((startup) => (
            <div key={startup._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{startup.name}</h5>
                  <p className="card-text">{startup.description}</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Budget:</strong> ₹{startup.budget}</li>
                    <li className="list-group-item"><strong>Category:</strong> {startup.category}</li>
                    <li className="list-group-item"><strong>Contact:</strong> {startup.contactNumber} | {startup.email}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center w-100">No startups available yet or matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;