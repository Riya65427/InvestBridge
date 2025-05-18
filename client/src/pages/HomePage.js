import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
     
      <section className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center px-3">
        <h1 className="mb-3 text-primary">Welcome to InvestBridge</h1>
        <p className="lead mb-4">
          A platform that connects ambitious startups with visionary investors.
        </p>
        <div>
          <Link to="/login" className="btn btn-primary me-3">Login</Link>
          <Link to="/signup" className="btn btn-outline-primary">Register</Link>
        </div>
      </section>

      
      <section className="container my-5">
        <h2 className="text-center mb-4">Why InvestBridge?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-rocket fs-1 text-primary mb-3"></i>
                <h5 className="card-title">Fast Matchmaking</h5>
                <p>Find the right match for your startup or funding goal within minutes.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-shield-check fs-1 text-primary mb-3"></i>
                <h5 className="card-title">Verified Community</h5>
                <p>Only genuine startups and verified investors are allowed.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-bar-chart-line fs-1 text-primary mb-3"></i>
                <h5 className="card-title">Real Insights</h5>
                <p>Track performance and understand your traction with analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white py-5 border-top">
        <div className="container">
          <h2 className="text-center mb-4">How It Works</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <span className="display-4 fw-bold text-primary">1</span>
              <h5 className="mt-3">Create Your Profile</h5>
              <p>Startup or Investor? Register and complete your profile.</p>
            </div>
            <div className="col-md-4 mb-4">
              <span className="display-4 fw-bold text-primary">2</span>
              <h5 className="mt-3">Discover Matches</h5>
              <p>Get matched with the right opportunities.</p>
            </div>
            <div className="col-md-4 mb-4">
              <span className="display-4 fw-bold text-primary">3</span>
              <h5 className="mt-3">Connect & Grow</h5>
              <p>Pitch, fund, grow together.</p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <h2 className="display-6 fw-bold mb-0">1200+</h2>
              <p className="mb-0">Startups</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-6 fw-bold mb-0">500+</h2>
              <p className="mb-0">Investors</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-6 fw-bold mb-0">$35M</h2>
              <p className="mb-0">Raised</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-6 fw-bold mb-0">30+</h2>
              <p className="mb-0">Countries</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h3 className="mb-3">Ready to get started?</h3>
          <Link to="/signup" className="btn btn-success btn-lg">Join Now →</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
