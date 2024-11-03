// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Adjust path as necessary
import LoginSignup from './pages/LoginSignup';
import HomePahe from './pages/homepage';
import MatchPage from './pages/matchPage';
import StudyPage from './pages/studyPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/home" element={<HomePahe />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/study" element={<StudyPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
