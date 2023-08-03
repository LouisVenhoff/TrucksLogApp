import React, { useEffect, useId, useState } from "react";
import "./tourDisplayStyle.css";
import TourElement from "./tourElement/tourElement";
import { TourState } from "../../claases/tour/tour";

import Tour from "../../claases/tour/tour";

type TourDisplayProps ={
    tourData:Tour[] 
}


const TourDisplay:React.FC<TourDisplayProps> = ({tourData}) => 
{

    const[tourElements, setTourElements] = useState<JSX.Element[]>();
    


    useEffect(() => {
       convertTourData();
    },[tourData]);


    const convertTourData = ()=> {
        let tempTours:JSX.Element[] = [];

        for(let i = 0; i < tourData.length; i++)
        {
            // tempTours.push(<TourElement start={tourData[i].startPos} target={tourData[i].targetPos} date={tourData[i].TimeString} state={tourData[i].state}/>);
            tempTours.push(<TourElement start={"PositionA"} target={"PositionB"} date={"21.12"} state={0}/>);
        }
        setTourElements(tempTours);
    }


    return(
        <div className="TourDisplayMainDiv">
          {tourElements}

        </div>
    );
}

export default TourDisplay;