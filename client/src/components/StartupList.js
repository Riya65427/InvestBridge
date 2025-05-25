const StartupList = ({ startups, onDelete }) => {
  return (
    <div>
      {startups.map((startup) => (
        <div key={startup._id} className="startup-card">
          <h3>{startup.name}</h3>
          <p>{startup.description}</p>
          <p><strong>Budget:</strong> {startup.budget}</p>
          <p><strong>Category:</strong> {startup.category}</p>
           <button onClick={() => onDelete(startup._id)} className="btn btn-danger">
            Delete
          </button>
         </div>
      ))}
    </div>
  );
};

export default StartupList;