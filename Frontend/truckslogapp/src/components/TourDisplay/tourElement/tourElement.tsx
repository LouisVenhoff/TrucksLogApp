import React from "react";
import "./tourElementStyle.css";
import onTrack from "../../../resources/symbols/onTrack.png";
import Completed from "../../../resources/symbols/completed.png";
import InCalculation from "../../../resources/symbols/inCalculation.png";
import Calculated from "../../../resources/symbols/calculated.png";
import InCheck from "../../../resources/symbols/inCheck.png";
import Old from "../../../resources/symbols/old.png";
import Rejected from "../../../resources/symbols/rejected.png";

const TourElement:React.FC = () => {
    return(
    <div className="TourElementMainDiv">
        <div className="TourElementSymbolDiv">
            <img src={Calculated}/>
        </div>
        <div className="TourElementDescription">
            <h1>Berlin - Rostock</h1>
        </div>
        <div className="TourElementDate">
            <h1>27.03</h1>
        </div>
    </div>
    );
}

export default TourElement;