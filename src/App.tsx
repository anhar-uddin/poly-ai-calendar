import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/calendar';

function App() {

  const [year, setYear] = useState(2020);
  const [month, setMonth] = useState(6);

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
}, []);

  return (
    <>
      <Calendar year={year} month={month} />
    </>
  );
}

export default App;
