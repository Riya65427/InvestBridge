import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Admin Panel (Static Data)</h3>
      <div className="table-responsive">
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alice</td>
              <td>alice@example.com</td>
              <td>Startup</td>
              <td className="text-success">Approved</td>
            </tr>
            <tr>
              <td>Bob</td>
              <td>bob@invest.com</td>
              <td>Investor</td>
              <td className="text-warning">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;