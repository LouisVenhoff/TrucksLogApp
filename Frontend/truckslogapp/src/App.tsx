import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/loginPage/loginPage';
import TourPage from "./pages/tourPage/tourPage";
import ApiController from './claases/controller/apiController';

function App() {
  
  
  const api = new ApiController("localhost", 3000);
  
  
  const loginFunc = (email:string, password:string) => 
  {
      window.alert(email);
      console.log(api.Login(email, password));
  } 
  
  return (
    <div className="App">
        {/* <TourPage accountName="Driver" avatarStr="https://abload.de/img/2000tojen.png" userTours={[]}/> */}
        <LoginPage onLogin={(email:string, password:string) => {loginFunc(email, password)}}/>
    </div>
  );
}

export default App;
