import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editFormData, setEditFormData] = useState({
    item1: '',
    item2: '',
    item3: '' 
  });
  const [userRole, setUserRole] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          let res;
          let dataToSet;

          if (user.role === 'investor') {
            res = await axios.get('/api/investors/me', config);
            dataToSet = {
              item1: res.data.interests || '',
              item2: res.data.budget || '',
              item3: res.data.contactInfo || ''
            };
          } else if (user.role === 'startup') {
            res = await axios.get('/api/startups/me', config);
            dataToSet = {
              item1: res.data.category || '',
              item2: res.data.budget || '',
              item3: res.data.contactInfo || '' 
            };
          } else {
            toast.error('Unknown user role.');
            return;
          }
          setProfileData(dataToSet); 
          setEditFormData(dataToSet); 

        } catch (err) {
          console.error("Error fetching profile:", err);
          toast.error('Failed to fetch profile data. You might need to create one first.');
          setProfileData({ item1: '', item2: '', item3: '' });
          setEditFormData({ item1: '', item2: '', item3: '' });
        }
      };
      fetchProfile();
    }
  }, []);

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      let endpoint = '';
      let data = {};

      if (userRole === 'investor') {
        endpoint = '/api/investors/me';
        data = { interests: editFormData.item1, budget: editFormData.item2, contactInfo: editFormData.item3 };
      } else if (userRole === 'startup') {
        endpoint = '/api/startups/me';
        data = { category: editFormData.item1, budget: editFormData.item2, contactInfo: editFormData.item3 };
      } else {
        toast.error('Unknown user role.');
        return;
      }

      const res = await axios.put(endpoint, data, config);
      const updatedData = {
        item1: userRole === 'investor' ? res.data.interests : res.data.category,
        item2: res.data.budget,
        item3: res.data.contactInfo
      };
      setProfileData(updatedData);
      setEditFormData(updatedData); 
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData(profileData);
  };

  if (profileData === null) {
    return (
      <div className="container mt-5 text-center">
        <p className="text-muted fs-5">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto bg-white rounded-3 border-0" style={{ maxWidth: '600px' }}>
        <h2 className="card-title text-center mb-4 display-5 fw-bold text-primary">Your Profile</h2>

        {!isEditing ? (
          <div className="p-3"> 
            <div className="mb-3">
              <strong className="text-secondary fs-5">{userRole === 'investor' ? 'Interests:' : 'Category:'}</strong>{' '}
              <span className="text-dark fs-5">{profileData.item1 || 'N/A'}</span>
            </div>
            <div className="mb-3">
              <strong className="text-secondary fs-5">Budget:</strong>{' '}
              <span className="text-dark fs-5">₹{profileData.item2 ? profileData.item2.toLocaleString() : 'N/A'}</span>
            </div>
            <div className="mb-4">
              <strong className="text-secondary fs-5">Contact Info:</strong>{' '}
              <span className="text-dark fs-5">{profileData.item3 || 'N/A'}</span>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary btn-lg w-100 shadow-sm" 
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="p-3"> 
            <h4 className="card-subtitle text-center mb-4 h4 text-secondary">Update Your Profile</h4>
            <div className="mb-3">
              <label htmlFor="item1" className="form-label fw-bold">
                {userRole === 'investor' ? 'Interests' : 'Category'}
              </label>
              <input
                id="item1"
                name="item1"
                className="form-control form-control-lg shadow-sm"
                placeholder={userRole === 'investor' ? 'e.g., Tech, Real Estate' : 'e.g., FinTech, AI'}
                value={editFormData.item1}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="item2" className="form-label fw-bold">
                Budget (₹)
              </label>
              <input
                id="item2"
                name="item2"
                className="form-control form-control-lg shadow-sm" 
                placeholder="e.g., 500000"
                value={editFormData.item2}
                onChange={handleEditChange}
                type="number"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="item3" className="form-label fw-bold">
                Contact Info
              </label>
              <input
                id="item3"
                name="item3"
                className="form-control form-control-lg shadow-sm" 
                placeholder="e.g., phone, email, LinkedIn"
                value={editFormData.item3}
                onChange={handleEditChange}
              />
            </div>
            <div className="d-grid gap-3"> 
              <button
                onClick={handleUpdate}
                className="btn btn-success btn-lg shadow-sm" 
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="btn btn-secondary btn-lg shadow-sm" 
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;