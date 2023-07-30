import React from "react";
import "./headerStyle.css";
import Logo from "../../resources/TrucksLogLogo.png";


const Header:React.FC = () => {
    return(
    <div className="HeaderMainDiv">
        <div className="HeaderLogoDiv">
            <img src={Logo}/>
        </div>
    </div>
    );
}

export default Header;