import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'startup'
  });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="form-group mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control"
            value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control"
            value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control"
            value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Role</label>
          <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
            <option value="startup">Startup</option>
            <option value="investor">Investor</option>
          </select>
        </div>
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;

