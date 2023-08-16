import React, { useEffect, useState } from "react";
import "./loginPageStyle.css";
import Logo from "../../resources/TrucksLogLogo.png";
import { Input, Button, Checkbox } from "@chakra-ui/react";

import Toaster from "../../claases/toaster/toaster";
import { AlertType } from "../../components/alertComponent/alertComponent";
import ApiController from "../../claases/controller/apiController";
import UserObj from "../../claases/user/userObj";

import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { switchPage } from "../../features/page";
import { switchLoadingScreen } from "../../features/loadingScreen";

import { Pages } from "../../enums/pages";
import { clearInterval } from "timers";
import LoginDataStorage from "../../claases/loginDataStorage/loginDataStorage";

type LoginPageProps = 
{
    api:ApiController
}




const LoginPage:React.FC<LoginPageProps> = ({api}) => 
{

    const [email, setEmail] = useState<string>("");
    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [autoLoginOn, setAutoLogin] = useState<boolean>(false);


    const dispatch = useDispatch();

    const savedData:LoginDataStorage = new LoginDataStorage();

    useEffect(() => {
        //savedData.clearData();
        tryAutoLogin();
    },[]);

    const tryAutoLogin = async () => {
        let loginObj:any = await savedData.loadData();
        console.log(loginObj);
        if(loginObj.email !== undefined && loginObj.email !== null)
        {
            loginFunc(loginObj.email, loginObj.password);
        }
    }


    const loginFunc = async (email:string, password:string) => 
    {
       
        dispatch(switchLoadingScreen(true));
        
        let loginObj:any = await api.Login(email, password);
        if(loginObj.id === -1)
        {
            Toaster.show("Email oder Passwort falsch", AlertType.WARNING, 1500);
            return;
        }
  
        let usrObj:UserObj = new UserObj(loginObj.id, loginObj.username, email, password, loginObj.clientKey, loginObj.avatar);
  
        dispatch(switchLoadingScreen(false));
        dispatch(login(usrObj.getReduxObj()));
        dispatch(switchPage(Pages.TOUR_LIST));
    } 

   
    

    const loginHandler = async() => 
    {
        if(!emailValid)
        {
            return;
        }

        if(autoLoginOn)
        {
            await savedData.storeData(email, password);
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

    const loginSaveHandler = (isChecked:any) => {
        setAutoLogin(isChecked);

        if(isChecked === false)
        {
            savedData.clearData();
        }
    }



    return(
        <div className="LoginPageDiv">
            <div className="LoginPageLogoDiv">
                 <img className="LoginPageLogoImg" src={Logo}/>
            </div>
            <div className="LoginPageControlsDiv">
                <Input isInvalid={!emailValid} placeholder="Email" backgroundColor="white"  onChange={(e:any) => {emailChangeHandler(e.target.value)}}/>
                <Input placeholder="Passwort" pr='4.5rem' type="password" backgroundColor="white"  onChange={(e:any) => {setPassword(e.target.value)}}/>
                <Button isActive={!emailValid} colorScheme="teal"  onClick={() => {loginHandler()}}>Login</Button>
                <Button colorScheme="teal" onClick={() => {registerHandler()}}>Registieren</Button>
                <div className="LoginPageCheckboxDiv">
                    <Checkbox size="lg" style={{color:"whitesmoke"}} colorScheme="teal" onChange={(e:any) => {loginSaveHandler(e.target.checked)}}>
                        Login speichern
                    </Checkbox>
                </div>
                
            </div>
        </div>
    );
}

export default LoginPage;