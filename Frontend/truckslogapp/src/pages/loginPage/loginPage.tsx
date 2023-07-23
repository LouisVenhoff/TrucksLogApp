import React from "react";
import "./loginPageStyle.css";
import Logo from "../../resources/TrucksLogLogo.png";

const LoginPage:React.FC = () => 
{
    return(
        <div className="LoginPageDiv">
            <div className="LoginPageLogoDiv">
                 <img className="LoginPageLogoImg" src={Logo}/>
            </div>
        </div>
    );
}

export default LoginPage;