import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-3 fw-bold mb-3">Welcome to InvestBridge</h1>
          <p className="lead mb-4">
            A platform that connects ambitious startups with visionary investors.
          </p>
          <div className="d-grid gap-3 d-md-block">
            <Link to="/login" className="btn btn-light btn-lg me-md-2">Login</Link>
            <Link to="/signup" className="btn btn-outline-light btn-lg">Register</Link>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center mb-5">Why InvestBridge?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <i className="bi bi-rocket-fill text-primary display-4 mb-3"></i> {/* Example icon */}
                <h5 className="card-title">Fast Matchmaking</h5>
                <p className="card-text">Find the right match for your startup or funding goal within minutes.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <i className="bi bi-check-circle-fill text-primary display-4 mb-3"></i> {/* Example icon */}
                <h5 className="card-title">Verified Community</h5>
                <p className="card-text">Only genuine startups and verified investors are allowed.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <i className="bi bi-graph-up-arrow text-primary display-4 mb-3"></i> {/* Example icon */}
                <h5 className="card-title">Real Insights</h5>
                <p className="card-text">Track performance and understand your traction with analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5 border-top border-bottom">
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-3">
                <span className="badge bg-primary rounded-pill fs-3 mb-3">1</span>
                <h5 className="mb-3">Create Your Profile</h5>
                <p>Startup or Investor? Register and complete your profile.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-3">
                <span className="badge bg-primary rounded-pill fs-3 mb-3">2</span>
                <h5 className="mb-3">Discover Matches</h5>
                <p>Get matched with the right opportunities.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-3">
                <span className="badge bg-primary rounded-pill fs-3 mb-3">3</span>
                <h5 className="mb-3">Connect & Grow</h5>
                <p>Pitch, fund, grow together.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-3 mb-4">
              <h2 className="display-4 fw-bold">1200+</h2>
              <p className="lead">Startups</p>
            </div>
            <div className="col-sm-6 col-md-3 mb-4">
              <h2 className="display-4 fw-bold">500+</h2>
              <p className="lead">Investors</p>
            </div>
            <div className="col-sm-6 col-md-3 mb-4">
              <h2 className="display-4 fw-bold">$35M</h2>
              <p className="lead">Raised</p>
            </div>
            <div className="col-sm-6 col-md-3 mb-4">
              <h2 className="display-4 fw-bold">30+</h2>
              <p className="lead">Countries</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h3 className="mb-4">Ready to get started?</h3>
          <Link to="/signup" className="btn btn-success btn-lg">Join Now &rarr;</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;