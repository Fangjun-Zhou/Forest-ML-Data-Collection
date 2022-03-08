import './App.css';
import '@mui/material'
import React, { useRef } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import Time from './Pages/Time';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="time" element={<Time />} />
      </Routes>
    </div>
  );
}

export default App;
