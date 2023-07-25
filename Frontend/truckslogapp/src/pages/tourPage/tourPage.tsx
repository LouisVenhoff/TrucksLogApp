import React from "react";
import "./tourPageStyle.css";
import { ArrowLeftIcon } from "@chakra-ui/icons"; 

const TourPage:React.FC = () => 
{
    return(
    <div className="TourPageMainDiv">
        <div className="TourPageBackBtn">
            <ArrowLeftIcon boxSize={6}/>
        </div>
        <div className="TourPageWelcomeTextDiv">
            <h1>Willkommen, Fahrer</h1>
        </div>
    </div>
    );
}

export default TourPage;