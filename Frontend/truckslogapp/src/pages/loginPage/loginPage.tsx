import React, { useEffect, useState } from "react";
import "./loginPageStyle.css";
import Logo from "../../resources/TrucksLogLogo.png";
import { Input, Button } from "@chakra-ui/react";

import Toaster from "../../claases/toaster/toaster";
import { AlertType } from "../../components/alertComponent/alertComponent";
import ApiController from "../../claases/controller/apiController";
import UserObj from "../../claases/user/userObj";

import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { switchPage } from "../../features/page";
import { Pages } from "../../enums/pages";

type LoginPageProps = 
{
    api:ApiController
}



const LoginPage:React.FC<LoginPageProps> = ({api}) => 
{

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
        dispatch(switchPage(Pages.TOUR_LIST));
    } 



    const [email, setEmail] = useState<string>("");
    const [emailValid, setEmailValid] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    

    const loginHandler = () => 
    {
        if(!emailValid)
        {
            return;
        }
        loginFunc(email, password);
    }

    const registerHandler = () => 
    {
       //Open register form from TrucksLog homepage
    }

    const checkEmail = (email:string):boolean => {
        let emailRegex = new RegExp("^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$");
        let result = emailRegex.test(email);
        return result;
    }

    const emailChangeHandler = (value:string) => 
    {
        setEmail(value);
        setEmailValid(checkEmail(value));
    }


    return(
        <div className="LoginPageDiv">
            <div className="LoginPageLogoDiv">
                 <img className="LoginPageLogoImg" src={Logo}/>
            </div>
            <div className="LoginPageControlsDiv">
                <Input isInvalid={!emailValid} placeholder="Email" backgroundColor="white" onChange={(e:any) => {emailChangeHandler(e.target.value)}}/>
                <Input placeholder="Passwort" backgroundColor="white" onChange={(e:any) => {setPassword(e.target.value)}}/>
                <Button isActive={!emailValid} colorScheme="teal" onClick={() => {loginHandler()}}>Login</Button>
                <Button colorScheme="teal" onClick={() => {registerHandler()}}>Registieren</Button>
            </div>
        </div>
    );
}

export default LoginPage;