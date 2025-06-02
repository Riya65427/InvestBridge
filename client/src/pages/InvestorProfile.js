import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; 
import { toast } from 'react-toastify';

const InvestorProfile = () => {
  const [profile, setProfile] = useState({ interests: '', budget: '', contactInfo: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/investors/me', { 
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching investor profile:", error);
        toast.error("Failed to fetch investor profile.");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/investors/me', profile, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Investor profile updated successfully!');
    } catch (error) {
      console.error("Error updating investor profile:", error);
      toast.error('Failed to update investor profile.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="card-title text-center mb-4">Edit Investor Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="interests" className="form-label">Interests</label>
            <input
              type="text"
              id="interests"
              name="interests"
              className="form-control"
              value={profile.interests}
              onChange={handleChange}
              placeholder="e.g., Technology, Green Energy"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="budget" className="form-label">Budget (₹)</label>
            <input
              type="number"
              id="budget"
              name="budget"
              className="form-control"
              value={profile.budget}
              onChange={handleChange}
              placeholder="e.g., 1000000"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactInfo" className="form-label">Contact Info</label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              className="form-control"
              value={profile.contactInfo}
              onChange={handleChange}
              placeholder="e.g., phone, email, LinkedIn"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestorProfile;