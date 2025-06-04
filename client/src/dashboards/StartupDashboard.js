import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Chat from '../components/Chat';

const StartupDashboard = () => {
  const [investors, setInvestors] = useState([]);
  const [interestFilter, setInterestFilter] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [selectedInvestorForChat, setSelectedInvestorForChat] = useState(null); 
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      toast.error("User not logged in. Please log in to access full features.");
      navigate('/login'); 
    }

    const fetchInvestors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("Authentication token not found.");
          return;
        }
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
    fetchInvestors();
  }, [interestFilter, budgetFilter, navigate]); 

  const handleAddStartup = () => {
    navigate('/startupform');
  };

  const handleChatWithInvestor = (investorUserObject) => {
    setSelectedInvestorForChat(investorUserObject);
  };

  return (
    <div className="container mt-5 bg-light p-5 rounded-3 shadow-lg">
      <h2 className="display-4 fw-bold text-center text-primary mb-3">Welcome Startup!</h2>
      <p className="lead text-center text-muted mb-5">Secure funding for your venture and connect with qualified investors.</p>
      <button
        className="btn btn-success btn-lg d-block mx-auto mb-5 shadow-sm"
        onClick={handleAddStartup}
      >
        Add Startup Idea
      </button>

      <h4 className="h3 text-secondary mb-4">Available Investors:</h4>
      <div className="mb-4 input-group">
        <input
          type="text"
          className="form-control form-control-lg shadow-sm"
          placeholder="Filter by Interest"
          value={interestFilter}
          onChange={(e) => setInterestFilter(e.target.value)}
        />
        <input
          type="number"
          className="form-control form-control-lg shadow-sm"
          placeholder="Max Budget (₹)"
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
        />
      </div>

      <div className="row">
        {investors.length > 0 ? (
          investors.map((inv) => (
            <div key={inv._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-lg border-primary">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-primary mb-3">
                    <strong>Name:</strong> {inv.user && inv.user.name ? inv.user.name : 'N/A'}
                  </h5>
                  <ul className="list-group list-group-flush flex-grow-1">
                    <li className="list-group-item"><strong>Budget:</strong> ₹{inv.budget ? inv.budget.toLocaleString() : 'N/A'}</li>
                    <li className="list-group-item"><strong>Interests:</strong> {inv.interests || 'N/A'}</li>
                    <li className="list-group-item"><strong>Contact:</strong> {inv.contactInfo || 'N/A'}</li>
                  </ul>
                  {currentUser && inv.user && inv.user._id && (
                    <button
                      className="btn btn-sm btn-outline-primary mt-3"
                      onClick={() => handleChatWithInvestor(inv.user)}
                    >
                      Chat with {inv.user.name}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center w-100 p-3">No investors found matching your criteria.</p>
        )}
      </div>
      {selectedInvestorForChat && currentUser && (
        <div className="mt-5 p-4 border rounded shadow-sm bg-white">
          <Chat currentChatUser={selectedInvestorForChat} currentUser={currentUser} />
          <button
            className="btn btn-outline-danger mt-3"
            onClick={() => setSelectedInvestorForChat(null)}
          >
            Close Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default StartupDashboard;