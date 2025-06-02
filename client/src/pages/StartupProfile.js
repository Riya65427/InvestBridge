import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; 
import { toast } from 'react-toastify';

const StartupProfile = () => {
  const [profile, setProfile] = useState({ category: '', idea: '', contactInfo: '', budget: '' }); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/startups/me', { 
          headers: { Authorization: `Bearer ${token}` }
        });
    
        setProfile({
          category: res.data.category || '',
          idea: res.data.description || '', 
          contactInfo: res.data.contactNumber || '', 
          budget: res.data.budget || ''
        });
      } catch (error) {
        console.error("Error fetching startup profile:", error);
        toast.error("Failed to fetch startup profile.");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/startups/me', { 
        category: profile.category,
        description: profile.idea, 
        contactNumber: profile.contactInfo, 
        budget: profile.budget
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Startup profile updated successfully!');
    } catch (error) {
      console.error("Error updating startup profile:", error);
      toast.error('Failed to update startup profile.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="card-title text-center mb-4">Edit Startup Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              className="form-control"
              value={profile.category}
              onChange={handleChange}
              placeholder="e.g., FinTech, SaaS"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="idea" className="form-label">Idea/Description</label>
            <input
              type="text"
              id="idea"
              name="idea"
              className="form-control"
              value={profile.idea}
              onChange={handleChange}
              placeholder="Brief description of your startup idea"
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
              placeholder="e.g., 500000"
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
              placeholder="e.g., phone, email"
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

export default StartupProfile;