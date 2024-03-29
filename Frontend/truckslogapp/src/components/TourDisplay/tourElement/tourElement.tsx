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

import { Icon, IconButton } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
//import {MdShoppingCartCheckout} from "react-icons/md";

type TourElementProps = {
    tourId:number,
    start:string,
    target:string,
    state:TourState,
    date:string,
    calcCallback?:(id:number) => void
}

const TourElement:React.FC<TourElementProps> = ({tourId, start, target, state, date, calcCallback}) => {
    
    const [tourSymbol, setTourSymbol] = useState<string>();
    const [billingActive, setBillingActive] = useState<boolean>(false);

    useEffect(() => {
        loadTourSymbol(state);

        setBillingActive(state == TourState.COMPLETED ? true : false);
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


    const billingHandler = () => {
        if(billingActive && calcCallback !== undefined)
        {
            calcCallback(tourId);
        }
    }


    
    
    return(
    <div className="TourElementMainDiv">
        <div className="TourElementSymbolDiv">
            <img src={tourSymbol}/>
        </div>
        <div>

        </div>
        <div className="TourElementDescription">
            <h3>{start} - {target}</h3>
            <h3>{date}</h3>
        </div>
        <div className="TourElementBillBtnDiv">
            {/* <IconButton isActive={!billingActive} icon={<Icon as={MdShoppingCartCheckout} />} aria-label="Abrechnen" colorScheme="messenger" onClick={billingHandler}/> */}
            <IconButton isActive={!billingActive} icon={<PlusSquareIcon />} aria-label="Abrechnen" colorScheme="messenger" onClick={billingHandler}/>
        </div>
    </div>
    );
}

export default TourElement;