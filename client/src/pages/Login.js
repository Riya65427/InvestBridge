import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', formData);
    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('userRole', user.role); 

    if (user.role === 'startup') {
      navigate('/startup');
    } else if (user.role === 'investor') {
      navigate('/investor');
    } else if (user.role === 'admin') {
      navigate('/admin');
    } else {
      alert('Invalid user role');
    }
  } catch (err) {
    alert('Login failed');
  }
};


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
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
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
