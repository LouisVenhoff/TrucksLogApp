import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/loginPage/loginPage';
import TourPage from "./pages/tourPage/tourPage";

function App() {
  return (
    <div className="App">
        <TourPage accountName="Driver" />
    </div>
  );
}

export default App;
