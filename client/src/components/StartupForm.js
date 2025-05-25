import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:5000/api/startup/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');
const newStartup = await response.json();
      addStartup(newStartup);
      setFormData({ name: '', description: '', budget: '', category: '', contactNumber: '', email: '' });
navigate('/startup'); 
    } catch (error) {
      console.error("Error submitting startup:", error);
      alert("Submission failed. Try again.");
    }
  };
return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4"> Post Your Startup Idea</h2>
        <p className="text-muted text-center">Connect with investors and bring your vision to life.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Startup Name</label>
            <input type="text" name="name" className="form-control" placeholder="Enter your startup name" value={formData.name} onChange={handleChange} required />
          </div>
<div className="mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-control" placeholder="Describe your startup" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Budget</label>
              <input type="number" name="budget" className="form-control" placeholder="Enter budget" value={formData.budget} onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <input type="text" name="category" className="form-control" placeholder="Enter startup category" value={formData.category} onChange={handleChange} required />
            </div>
          </div>

          
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input type="tel" name="contactNumber" className="form-control" placeholder="Enter your contact number" value={formData.contactNumber} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-success w-100 py-2 mt-3"> Submit Your Startup idea</button>
        </form>
      </div>
    </div>
  );
};

export default StartupForm;