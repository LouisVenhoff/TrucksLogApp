import React from "react";
import "./tourDisplayStyle.css";
import TourElement from "./tourElement/tourElement";
import { TourState } from "../../claases/tour/tour";

import Tour from "../../claases/tour/tour";

type TourDisplayProps ={
    tour:Tour
}

const TourDisplay:React.FC<TourDisplayProps> = ({tour}) => 
{
    return(
        <div className="TourDisplayMainDiv">
            <TourElement start={tour.startPos} target={tour.targetPos} date={tour.TimeString} state={tour.state}/>
        </div>
    );
}

export default TourDisplay;