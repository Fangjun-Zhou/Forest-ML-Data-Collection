import './App.css';
import '@mui/material'
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Time from './Pages/Time';
import Question from './Pages/Question';
import QuestionSet from './Pages/QuestionSet';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/time" element={<Time />} />
        <Route path="/question" element={<Question />} />
        <Route path="/questionSet" element={<QuestionSet />} />
      </Routes>
    </div>
  );
}

export default App;
