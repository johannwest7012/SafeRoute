import logo from './logo.svg';
import './App.css';
import WorldMapScreen from './views/WorldMapScreen';
import Landing from './views/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/map" element={<WorldMapScreen />} />
    </Routes>
  </Router>
    
  );
}

export default App;