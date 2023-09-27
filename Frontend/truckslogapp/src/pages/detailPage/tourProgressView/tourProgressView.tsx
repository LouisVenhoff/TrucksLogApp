import React, { useEffect, useState } from "react";
import "./tourProgressViewStyle.css";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

type TourProgressViewProps = {
    fullDistance:number,
    traveledDistance:number
}



const TourProgressView:React.FC<TourProgressViewProps> = ({fullDistance, traveledDistance}) => 
{

    const [traveled, setTraveled] = useState<number>(traveledDistance);
    const [percentage, setPercentage] = useState<number>(0);


    useEffect(() => {traveledChangeHandler()},[traveledDistance]);


    const traveledChangeHandler = () => 
    {
        setTraveled(traveledDistance);
        setPercentage(calculatePercentage(traveledDistance, fullDistance));
    }



    const calculatePercentage = (traveled:number, full:number):number => 
    {
        let singlePercent:number = full / 100;

        let percentageValue = traveled / singlePercent;

        return percentageValue;
    }



    return(
    <div className="TourProgressViewMainDiv">
         <CircularProgress value={percentage} color="green.400" size="200px">
                <CircularProgressLabel>{percentage}%</CircularProgressLabel>
         </CircularProgress>
         <h1>{traveled}KM / {fullDistance}KM</h1>
    </div>
    );
}



export default TourProgressView;