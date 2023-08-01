import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/loginPage/loginPage';
import TourPage from "./pages/tourPage/tourPage";
import ApiController from './claases/controller/apiController';
import AlertComponent, { AlertType } from './components/alertComponent/alertComponent';
import AlertProvider from './components/alertProvider/alertProvider';

function App() {
  
  
  const api = new ApiController("localhost", 3000);
  
  
  const loginFunc = async (email:string, password:string) => 
  {
      let loginObj:any = await api.Login(email, password);
      if(loginObj.id === -1)
      {
        console.log("Zugriff verweigert!");
      }
  } 
  
  return (
    <div className="App">
        <AlertProvider />
        {/* <TourPage accountName="Driver" avatarStr="https://abload.de/img/2000tojen.png" userTours={[]}/> */}
        <LoginPage onLogin={(email:string, password:string) => {loginFunc(email, password)}}/>
    </div>
  );
}

export default App;
