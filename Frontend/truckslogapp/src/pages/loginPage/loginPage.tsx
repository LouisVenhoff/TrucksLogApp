import React, { useEffect, useState } from "react";
import "./loginPageStyle.css";
import Logo from "../../resources/TrucksLogLogo.png";
import { Input, Button } from "@chakra-ui/react";

type LoginPageProps = 
{
    onLogin:(email:string, password:string) => void
}



const LoginPage:React.FC<LoginPageProps> = ({onLogin}) => 
{
    
    const [email, setEmail] = useState<string>("");
    const [emailValid, setEmailValid] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    

    const loginHandler = () => 
    {
        if(!emailValid)
        {
            return;
        }
        onLogin(email, password);
    }

    const registerHandler = () => 
    {
        window.alert("RegisterHandler!");
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