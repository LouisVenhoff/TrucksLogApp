import React, { useEffect, useState } from "react";
import "./menuButtonStyle.css";


type MenuButtonProps = {
    name:string,
    isLastButton?:boolean,
    onClick: () => void
}



const MenuButton:React.FC<MenuButtonProps> = ({name, onClick}) => 
{
    return(
    <div className="MenuButtonMainDiv" onClick={onClick} style={{borderWidth:"10px, 0px, 0px, 0px"}}>
        <h1>{name}</h1>
    </div>
    );
}


export default MenuButton;