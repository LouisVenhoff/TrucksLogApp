import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/loginPage/loginPage';
import TourPage from "./pages/tourPage/tourPage";
import ApiController from './claases/controller/apiController';
import AlertComponent, { AlertType } from './components/alertComponent/alertComponent';
import AlertProvider from './components/alertProvider/alertProvider';
import Toaster from './claases/toaster/toaster';
import UserObj from './claases/user/userObj';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

import { login } from './features/user';

function App() {
  
  const user:any = useSelector((state:any) => state.value);
  
  const api = new ApiController("localhost", 3000);
  
  const dispatch = useDispatch();
  
  const loginFunc = async (email:string, password:string) => 
  {
      let loginObj:any = await api.Login(email, password);
      if(loginObj.id === -1)
      {
          Toaster.show("Email oder Passwort falsch", AlertType.WARNING, 1500);
          return;
      }

      console.log(loginObj);

      let usrObj:UserObj = new UserObj(loginObj.id, loginObj.username, email, password, loginObj.clientKey, loginObj.avatar);

      dispatch(login(usrObj.getReduxObj()));

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
