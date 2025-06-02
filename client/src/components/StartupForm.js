import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; 
import { toast } from 'react-toastify'; 

const StartupForm = ({ addStartup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: '',
    category: '',
    contactNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You need to be logged in to submit a startup idea.');
        navigate('/login'); 
        return;
      }
      const response = await axios.post('/api/startups/submit', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const newStartup = response.data; 
      addStartup(newStartup);
      setFormData({ name: '', description: '', budget: '', category: '', contactNumber: '', email: '' });
      toast.success('Startup idea submitted successfully!');
      navigate('/startup');
    } catch (error) {
      console.error("Error submitting startup:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Submission failed: ${error.response.data.error}`);
      } else {
        toast.error("Submission failed. Please try again later.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '700px' }}>
        <h2 className="card-title text-center mb-4">Post Your Startup Idea</h2>
        <p className="card-subtitle text-muted text-center mb-4">Connect with investors and bring your vision to life.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Startup Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter your startup name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Describe your startup"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="budget" className="form-label">Budget (₹)</label>
              <input
                type="number"
                id="budget"
                name="budget"
                className="form-control"
                placeholder="Enter required budget"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                className="form-control"
                placeholder="e.g., Technology, Healthcare"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              className="form-control"
              placeholder="Enter your contact number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            onClick={handleSubmit}
          >
            Submit Your Startup Idea
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartupForm;