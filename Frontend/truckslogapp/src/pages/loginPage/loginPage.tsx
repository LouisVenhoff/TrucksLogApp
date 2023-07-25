import React, { useEffect, useState } from "react";
import "./loginPageStyle.css";
import Logo from "../../resources/TrucksLogLogo.png";
import { Input, Button } from "@chakra-ui/react";


const LoginPage:React.FC = () => 
{
    
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    
    useEffect(() => {console.log(email)},[email]);


    const loginHandler = () => 
    {
        window.alert("LoginHandler!");
    }

    const registerHandler = () => 
    {
        window.alert("RegisterHandler!");
    }


    return(
        <div className="LoginPageDiv">
            <div className="LoginPageLogoDiv">
                 <img className="LoginPageLogoImg" src={Logo}/>
            </div>
            <div className="LoginPageControlsDiv">
                <Input placeholder="Email" backgroundColor="white" onChange={(e:any) => {setEmail(e.target.value)}}/>
                <Input placeholder="Passwort" backgroundColor="white" onChange={(e:any) => {setPassword(e.target.value)}}/>
                <Button colorScheme="teal" onClick={() => {loginHandler()}}>Login</Button>
                <Button colorScheme="teal" onClick={() => {registerHandler()}}>Registieren</Button>
            </div>
        </div>
    );
}

export default LoginPage;