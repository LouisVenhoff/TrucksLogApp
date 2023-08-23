import React, { useEffect, useState } from "react";
import "./alertProviderStyle.css";
import AlertComponent, { AlertType } from "../alertComponent/alertComponent";
import {useSelector} from "react-redux";
import Toaster from "../../claases/toaster/toaster";

const AlertProvider:React.FC = () => 
{

    const[isOpen, setIsOpen] = useState<boolean>(false);
    const[text, setText] = useState<string>("");
    const[type, setType] = useState<AlertType>(AlertType.INFO);

    useEffect(() => {
        Toaster.toasterCallback = (message:string, type:AlertType) => {
            setText(message);
            setType(type);
            setIsOpen(true);
            setTimeout(() => {setIsOpen(false)},1000);
        }
    },[]);

    return(<AlertComponent isOpen={isOpen} text={text} type={type}/>);
}

export default AlertProvider;

