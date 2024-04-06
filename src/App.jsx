import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import AboutPage from './pages/about';

function App() {

  return (

<div className="App">
    
<Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
  </Router>
 
</div>
  );
}

export default App;
