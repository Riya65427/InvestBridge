import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h3>Admin Panel</h3>
      <table className="table table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alice</td>
            <td>alice@example.com</td>
            <td>Startup</td>
            <td>Approved</td>
          </tr>
          <tr>
            <td>Bob</td>
            <td>bob@invest.com</td>
            <td>Investor</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
