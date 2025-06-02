import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StartupDashboard = () => {
  const [investors, setInvestors] = useState([]);
  const [interestFilter, setInterestFilter] = useState(''); 
  const [budgetFilter, setBudgetFilter] = useState(''); 
  const navigate = useNavigate();

  const fetchInvestors = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          interest: interestFilter,
          budget: budgetFilter
        }
      };
      const res = await axios.get('/api/investors', config);
      setInvestors(res.data);
    } catch (error) {
      console.error("Error fetching investors:", error);
      toast.error("Failed to load investors.");
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, [interestFilter, budgetFilter]); 

  const handleAddStartup = () => {
    navigate('/startupform');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome Startup!</h2>
      <h5 className="mb-4">Secure funding for your venture and connect with qualified investors. </h5>
      <button
        className="btn btn-primary mb-4"
        onClick={handleAddStartup}
      >
        Add Startup Idea
      </button>

      <h4 className="mb-3">Available Investors:</h4>
      <div className="mb-4 d-flex gap-3"> 
        <input
          type="text"
          className="form-control"
          placeholder="Filter by Interest"
          value={interestFilter}
          onChange={(e) => setInterestFilter(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Max Budget (₹)"
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
        />
      </div>

      <div className="row">
        {investors.length > 0 ? (
          investors.map((inv) => (
            <div key={inv._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title"><strong>Name:</strong> {inv.user && inv.user.name ? inv.user.name : 'N/A'}</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Budget:</strong> ₹{inv.budget || 'N/A'}</li>
                    <li className="list-group-item"><strong>Interests:</strong> {inv.interests || 'N/A'}</li>
                    <li className="list-group-item"><strong>Contact:</strong> {inv.contactInfo || 'N/A'}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center w-100">No investors found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default StartupDashboard;