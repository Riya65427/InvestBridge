import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  

import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import StartupDashboard from './dashboards/StartupDashboard';
import InvestorDashboard from './dashboards/InvestorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import StartupForm from './components/StartupForm';
import StartupList from './components/StartupList';

function App() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    fetch('/api/startup/list')
      .then(res => res.json())
      .then(data => setStartups(data));
  }, []);

  const addStartup = (newStartup) => {
    setStartups(prevStartups => [...prevStartups, newStartup]); 
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/startup" element={<StartupDashboard />} />
        <Route path="/investor" element={<InvestorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/submit-startup" 
          element={
            <div>
              <StartupForm addStartup={addStartup} />
              <StartupList startups={startups} />
            </div>
          } 
        />
      </Routes>
      
      {/* Add ToastContainer so all components can use toast notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;