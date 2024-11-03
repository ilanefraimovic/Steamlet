import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import LoginSignup from './pages/LoginSignup';
import HomePahe from './pages/homepage';
import MatchPage from './pages/matchPage';
import StudyPage from './pages/studyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} /> {/* Route for the login/signup page */}
        <Route path="/home" element={<HomePahe />} /> {/* Route for the login/signup page */}

        <Route path="/match" element={<MatchPage />} /> {/* Route for the match page */}
        <Route path="/study" element={<StudyPage />} /> {/* Route for the study page */}
      </Routes>
    </Router>
  );
}

export default App;
