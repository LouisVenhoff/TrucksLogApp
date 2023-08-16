import React, { useEffect, useId, useState } from "react";
import "./tourDisplayStyle.css";
import TourElement from "./tourElement/tourElement";
import { TourState } from "../../claases/tour/tour";

import Tour from "../../claases/tour/tour";

type TourDisplayProps ={
    tourData:Tour[],
    noDataText:string,
    calcCallback:(id:number) => void 
}


const TourDisplay:React.FC<TourDisplayProps> = ({tourData, noDataText, calcCallback}) => 
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
            tempTours.push(<TourElement tourId={tourData[i].tourId} start={tourData[i].startPos} target={tourData[i].targetPos} date={(`${tourData[i].day}.${tourData[i].month}.${tourData[i].year}`)} state={tourData[i].state} calcCallback={(id:number) => {calcCallback(id)}}/>);
        }
        setTourElements(tempTours);
    }


    return(
        <div className="TourDisplayMainDiv">
          <h2>{noDataText}</h2>
          {tourElements}

        </div>
    );
}

export default TourDisplay;