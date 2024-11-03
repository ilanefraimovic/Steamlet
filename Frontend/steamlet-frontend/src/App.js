import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import LoginSignup from './pages/LoginSignup';
import HomePage from './pages/homepage';
import MatchPage from './pages/matchPage';
import StudyPage from './pages/studyPage';
import { UserProvider } from './UserContext';
import store from './reduxStore';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <UserProvider>
    <Router>
      <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/study" element={<StudyPage />} />
      </Routes>
    </Router>
    </UserProvider>
    </Provider>
  );
}

export default App;
