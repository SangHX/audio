import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'configs/i18n';
import Home from 'page/home';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
