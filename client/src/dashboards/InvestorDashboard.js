import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat'; 

const InvestorDashboard = () => {
  const [startups, setStartups] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [selectedStartupForChat, setSelectedStartupForChat] = useState(null);
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
  }, [searchCategory, navigate]);

  const handleChatWithStartup = (startupObject) => {
    setSelectedStartupForChat(startupObject);
  };

  return (
    <div className="container mt-5 bg-light p-5 rounded-3 shadow-lg">
      <h2 className="display-4 fw-bold text-center text-primary mb-3">Welcome Investor!</h2>
      <p className="lead text-center text-muted mb-5">Discover high-growth startups, manage your investments and connect with promising opportunities.</p>

      <div className="mb-5">
        <input
          type="text"
          className="form-control form-control-lg shadow-sm"
          placeholder="Search startups by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>

      <h4 className="h3 text-secondary mb-4">Available Startups:</h4>
      <div className="row">
        {startups.length > 0 ? (
          startups.map((startup) => (
            <div key={startup._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-lg border-primary">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-primary mb-2">{startup.name}</h5>
                  <p className="card-text text-muted flex-grow-1">{startup.description}</p>
                  <ul className="list-group list-group-flush mt-auto">
                    <li className="list-group-item"><strong>Budget:</strong> ₹{startup.budget ? startup.budget.toLocaleString() : 'N/A'}</li>
                    <li className="list-group-item"><strong>Category:</strong> {startup.category || 'N/A'}</li>
                    <li className="list-group-item"><strong>Contact:</strong> {startup.contactNumber || 'N/A'} | {startup.email || 'N/A'}</li>
                  </ul>
                  {currentUser && startup._id && startup.name && ( 
                    <button
                      className="btn btn-sm btn-outline-primary mt-3"
                      onClick={() => handleChatWithStartup(startup)}
                    >
                      Chat with {startup.name}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center w-100 p-3">No startups available yet or matching your search.</p>
        )}
      </div>

      {selectedStartupForChat && currentUser && (
        <div className="mt-5 p-4 border rounded shadow-sm bg-white">
          <Chat currentChatUser={selectedStartupForChat} currentUser={currentUser} />
          <button
            className="btn btn-outline-danger mt-3"
            onClick={() => setSelectedStartupForChat(null)} 
          >
            Close Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default InvestorDashboard;