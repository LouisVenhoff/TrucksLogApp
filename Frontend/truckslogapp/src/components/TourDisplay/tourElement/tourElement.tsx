import React, { useEffect, useState } from "react";
import "./tourElementStyle.css";
import onTrack from "../../../resources/symbols/onTrack.png";
import Completed from "../../../resources/symbols/completed.png";
import InCalculation from "../../../resources/symbols/inCalculation.png";
import Calculated from "../../../resources/symbols/calculated.png";
import InCheck from "../../../resources/symbols/inCheck.png";
import Old from "../../../resources/symbols/old.png";
import Rejected from "../../../resources/symbols/rejected.png";
import { TourState } from "../../../claases/tour/tour";

type TourElementProps = {
    start:string,
    target:string,
    state:TourState,
    date:string,
}

const TourElement:React.FC<TourElementProps> = ({start, target, state, date}) => {
    
    const [tourSymbol, setTourSymbol] = useState<string>();
    
    useEffect(() => {
        loadTourSymbol(state);
    },[state]);


    
    const loadTourSymbol = (tourState:TourState) => 
    {
        switch(tourState)
        {
            case TourState.AUF_FAHRT:
                setTourSymbol(onTrack);
                break;
            case TourState.COMPLETED:
                setTourSymbol(Completed);
                break;
            case TourState.REJECTED:
            case TourState.CANCELLED:
                setTourSymbol(Rejected);
                break;
            case TourState.IN_CHECK:
                setTourSymbol(InCheck);
                break;
            case TourState.OLD:
                setTourSymbol(Old);
                break;
            case TourState.BILLING:
                setTourSymbol(InCalculation);
                break;
            case TourState.BILLED:
                setTourSymbol(Calculated);
                break;
            default:
                break;
            

        }
    }


    
    
    return(
    <div className="TourElementMainDiv">
        <div className="TourElementSymbolDiv">
            <img src={tourSymbol}/>
        </div>
        <div className="TourElementDescription">
            <h1>{start} - {target}</h1>
        </div>
        <div className="TourElementDate">
            <h1>{date}</h1>
        </div>
    </div>
    );
}

export default TourElement;