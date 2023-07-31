import React from "react";
import "./alertProviderStyle.css";
import AlertComponent, { AlertType } from "../alertComponent/alertComponent";

const AlertProvider:React.FC = () => 
{
    return(<AlertComponent isOpen={true} text="Login fehlgeschlagem" type={AlertType.SUCCESS}/>);
}

export default AlertProvider;

