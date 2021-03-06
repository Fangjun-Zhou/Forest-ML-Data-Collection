import './App.css';
import '@mui/material'
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import QuestionSet from './Pages/QuestionSet';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionSet" element={<QuestionSet />} />
      </Routes>
    </div>
  );
}

export default App;
