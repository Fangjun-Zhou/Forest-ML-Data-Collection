import './App.css';
import '@mui/material'
import { Button } from '@mui/material';
import React from 'react';
import Time from './Time/Time';

function App() {
  const timeRef = React.createRef()

  // App init
  setInterval(() => {
    timeRef.current.UpdateTime();
  }, 5000);

  function HandleTimeUpdateButton() {
    timeRef.current.UpdateTime();
  }

  return (
    <div>
      <Time ref={timeRef}></Time>
      <Button onClick={HandleTimeUpdateButton}>Get Time</Button>
    </div >
  );
}

export default App;
