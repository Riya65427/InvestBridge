import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import StartupDashboard from './dashboards/StartupDashboard';
import InvestorDashboard from './dashboards/InvestorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';



function App() {
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

        
      </Routes>
    </Router>
  );
}

export default App;
