import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/calendar';

function App() {
  return (
    <>
      <Calendar year={2020} month={6} />
    </>
  );
}

export default App;
