import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; 

const InvestorList = () => {
  const [investors, setInvestors] = useState([]);
  const [interest, setInterest] = useState('');
  const [budget, setBudget] = useState('');

  const fetchInvestors = async () => {
    try {
      const res = await axios.get('/api/investors', { 
        params: { interest, budget },
      });
      setInvestors(res.data);
    } catch (error) {
      console.error("Error fetching investors:", error);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, [interest, budget]); 

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Investors</h2>
      <div className="input-group mb-3">
        <input
          placeholder="Filter by Interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="form-control"
        />
        <input
          placeholder="Max Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="form-control"
          type="number"
        />
      </div>
      <ul className="list-group">
        {investors.length > 0 ? (
          investors.map((inv) => (
            <li
              key={inv._id}
              className="list-group-item mb-3 shadow-sm"
            >
              <h5 className="mb-1"><strong>Name:</strong> {inv.name || 'N/A'}</h5>
              <p className="mb-1"><strong>Interest:</strong> {inv.interests || 'N/A'}</p>
              <p className="mb-1"><strong>Budget:</strong> ₹{inv.budget || 'N/A'}</p>
              <p className="mb-0"><strong>Contact:</strong> {inv.contactInfo || 'N/A'}</p>
            </li>
          ))
        ) : (
          <p className="text-muted">No investors found.</p>
        )}
      </ul>
    </div>
  );
};

export default InvestorList;