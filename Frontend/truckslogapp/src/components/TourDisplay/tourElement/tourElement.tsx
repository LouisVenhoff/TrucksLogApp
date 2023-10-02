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

import { useSelector } from "react-redux";
import { Interactions } from "../../../enums/interactions";
// import {MdShoppingCartCheckout} from "react-icons/md";

type TourElementProps = {
    tourId: number,
    start: string,
    target: string,
    state: TourState,
    date: string,
    interactionCallback?: (id: number, type: Interactions) => void,
}

const TourElement: React.FC<TourElementProps> = ({ tourId, start, target, state, date, interactionCallback }) => {

    const [tourSymbol, setTourSymbol] = useState<string>();
    const [billingActive, setBillingActive] = useState<boolean>(false);

    const userRedux = useSelector((state: any) => state.user.value);


    useEffect(() => {
        loadTourSymbol(state);

        setBillingActive(state === TourState.COMPLETED && userRedux.billPermission === true ? true : false);
    }, [state]);



    const loadTourSymbol = (tourState: TourState) => {
        switch (tourState) {
            case TourState.ON_TOUR:
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
        if (billingActive && interactionCallback !== undefined) {
            interactionCallback(tourId, Interactions.CALCULATE);
        }
    }


    const viewHandler = () => {
        if (interactionCallback !== undefined) {
            interactionCallback(tourId, Interactions.VIEW);
        }
    }




    return (
        <div className="TourElementMainDiv">
            <div className="TourElementSymbolDiv">
                <img src={tourSymbol} />
            </div>
            <div className="TourElementInfoClickDiv" onClick={viewHandler}>
                <div className="TourElementDescription">
                    <h3>{start} - {target}</h3>
                    <h3>{date}</h3>
                </div>
            </div>
            <div className="TourElementBillBtnDiv">
                {/* <IconButton style={{display:billingActive ? "" : "none"}} isActive={!billingActive} icon={<Icon as={MdShoppingCartCheckout} />} aria-label="Abrechnen" colorScheme="messenger" onClick={billingHandler}/> */}
                <IconButton style={{ display: billingActive ? "" : "none" }} isActive={!billingActive} icon={<PlusSquareIcon />} aria-label="Abrechnen" colorScheme="messenger" onClick={billingHandler} />
            </div>
        </div>
    );
}

export default TourElement;