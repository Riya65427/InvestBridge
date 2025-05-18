import React from 'react';

const InvestorDashboard = () => {
  return (
    <div className="container mt-4">
      <h3>Welcome Investor!</h3>
      <p>Explore promising startups to invest in.</p>
      <div className="card mt-3 p-3">
        <h5>Startup: TechNova</h5>
        <p><strong>Field:</strong> EdTech</p>
        <p><strong>Pitch:</strong> Personalized learning using AI & ML</p>
        <button className="btn btn-outline-primary mt-2">Contact Startup</button>
      </div>
    </div>
  );
};

export default InvestorDashboard;
