import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Routes wrapped in a Layout */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard/student" replace />} />
          <Route path="student" element={<StudentDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="staff" element={<StaffDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
