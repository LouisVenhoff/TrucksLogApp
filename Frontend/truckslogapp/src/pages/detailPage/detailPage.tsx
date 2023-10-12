import React, { useEffect, useRef, useState } from "react";
import "./detailPageStyle.css";
import Header from "../../components/header/header";
import HamburgerMenu from "../../components/hamburgerMenu/hamburgerMenu";
import { ArrowBackIcon } from "@chakra-ui/icons";
import useMenu from "../../hooks/useMenu";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import TourProgressView from "./tourProgressView/tourProgressView";
import DataViewCell from "./dataViewCell/dataViewCell";
import Tour, { TourState } from "../../claases/tour/tour";
import ApiController from "../../claases/controller/apiController";
import useTour from "../../hooks/useTour";
import {useSelector} from "react-redux";
import usePage from "../../hooks/usePage";
import { Pages } from "../../enums/pages";


type DetailPageProps = {
    api:ApiController,
    refreshInterval:number
}


const DetailPage:React.FC<DetailPageProps> = ({api, refreshInterval}) => 
{

    const[tourObj, setTourObj] = useState<Tour>(new Tour())
    
    const [full, setFull] = useState<number>(0);
    const [traveled, setTraveled] = useState<number>(0);


    const tourData:any = useTour();
    const menu = useMenu();
    const pageHook = usePage();

    const userRedux:any = useSelector((state:any) => state.user.value);

    let fetchTimer:any = useRef();
  


    useEffect(() => {
        // fetchTourData(tourData.tourId);
        startDataFetching();
        return(() => {
            clearInterval(fetchTimer.current);
        });
        
    },[]);

    useEffect(() => {
        if(tourObj !== undefined)
        {
            setFull(tourObj.fullDistance);
            setTraveled(tourObj.fullDistance - tourObj.restDistance);
        }
    },[tourObj]);

    const startDataFetching = () => 
    {
        fetchTourData(tourData.tourId);
        fetchTimer.current = setInterval(() => {fetchTourData(tourData.tourId)}, refreshInterval);
    }



    const returnToTourPage = () => 
    {
        pageHook.loadPage(Pages.TOUR_LIST);
    }


    const fetchTourData = async (id:number) => 
    {
        let fetchedTour = await api.LoadSingleTour(userRedux.id,id, userRedux.clientKey);
        setTourObj(fetchedTour);
    }

    const getStateName = (state:TourState):string => 
    {
        switch(state)
        {
            case TourState.ON_TOUR:
                return "Auf Fahrt";
                break;
            case TourState.COMPLETED:
                return "Abgeschlossen";
                break;
            case TourState.REJECTED:
                return "Abgelehnt";
                break;
            case TourState.CANCELLED:
                return "Abgebrochen";
                break;
            case TourState.OLD:
                return "Veraltet";
                break;
            case TourState.IN_CHECK:
                return "In Prüfung";
                break;
            case TourState.BILLING:
                return "In Abrechnung"
                break;
            case TourState.BILLED:
                return "Abgerechnet";
                break;
            default:
                return "Abgelehnt";
                break;
        }


    }


    return(
    <div className="DetailPageMainDiv">
        <div className="DetailPageHeaderDiv">
            <Header />
        </div>
        <div className="DetailPageHamburgerBtnDiv">
            <ArrowBackIcon boxSize={10} onClick={() => {returnToTourPage()}}/>
        </div>
        <div className="DetailPageTourProgress">
           <TourProgressView fullDistance={full} traveledDistance={traveled} />
        </div>
        <div className="DetailPageDataView">
            <DataViewCell label="🚚Spiel" value={tourObj!.game === 1 ?  "ATS" : "ETS"} />
            <DataViewCell label="👨‍🦰 Nickname" value={tourObj!.nickname} />
            <DataViewCell label="🏢 Startort" value={tourObj!.startPos} />
            <DataViewCell label="🏢 Zielort" value={tourObj!.targetPos} />
            <DataViewCell label="📦 Ladung" value={tourObj!.charge} />
            <DataViewCell label="💰 Einkommen" value={tourObj!.income.toString()+ "€"} />
            <DataViewCell label="📈 KM-Preis" value={tourObj!.kmPrice.toString() + "€"} />
            <DataViewCell label="🧭 Strecke" value={tourObj!.fullDistance.toString() + "KM"} />
            <DataViewCell label="🧭 Rest-Strecke" value={tourObj!.restDistance.toString() + "KM"} />
            <DataViewCell label="🧭 Gefahrene Strecke" value={tourObj!.traveledDistance.toString() + "KM"} />
            <DataViewCell label="🧭 Gestartet" value={tourObj!.startTime} />
            <DataViewCell label="🎯 Ende" value={tourObj!.endTime} />
            <DataViewCell label="🤕 Frachtschaden" value={tourObj!.freightDamage.toString() + "%"} />
            <DataViewCell label="⛽ Tankvolumen" value={Math.trunc(tourObj!.tankVolume).toString() + "Liter"} />
            <DataViewCell label="⛽ Start-Tankinhalt" value={Math.trunc(tourObj!.startFuel).toString()+ "Liter"} />
            <DataViewCell label="⛽ Ende-Tankinhalt" value={Math.trunc(tourObj!.endFuel).toString() + "Liter"} />
            <DataViewCell label="⛽ Verbrauch-Tankinhalt" value={Math.trunc(tourObj!.fuelConsumption).toString() + "Liter"} />
            <DataViewCell label="⛽ Nachgetankt" value={Math.trunc(tourObj!.refueled).toString() + "Liter"}/>
            <DataViewCell label="📟 Start-KM-LKW" value={Math.trunc(tourObj!.truckODOStart).toString() + "KM"} />
            <DataViewCell label="📟 Ende-KM-LKW" value={Math.trunc(tourObj!.truckODOEnd).toString() + "KM"} />
            <DataViewCell label="📟 Diff.-KM-LKW" value={Math.trunc(tourObj!.truckDistance).toString() + "KM"} />
            <DataViewCell label="🚀 Max. Speed" value={Math.trunc(tourObj!.maxSpeed).toString() + "KM/H"} />
            <DataViewCell label="💲 Abgerechnet" value={tourObj.billDate} />
            <DataViewCell label="💡 Notizen" value={tourObj.notes} />
            <DataViewCell label="💡 Status" value={getStateName(tourObj.state)} />
            <DataViewCell label="TourID" value={tourObj!.tourId.toString()} />
        </div>
    </div>
    );
}

export default DetailPage;