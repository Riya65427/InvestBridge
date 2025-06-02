import React from 'react';
import { toast } from 'react-toastify';

const StartupList = ({ startups, onDelete }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this startup?")) {
      await onDelete(id);
      toast.success("Startup deleted successfully!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {startups.length > 0 ? (
          startups.map((startup) => (
            <div key={startup._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{startup.name}</h5>
                  <p className="card-text flex-grow-1">{startup.description}</p>
                  <p className="card-text"><strong>Budget:</strong> ₹{startup.budget}</p>
                  <p className="card-text"><strong>Category:</strong> {startup.category}</p>
                  <button
                    onClick={() => handleDelete(startup._id)}
                    className="btn btn-danger mt-3 align-self-end"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center w-100">No startups found.</p>
        )}
      </div>
    </div>
  );
};

export default StartupList;