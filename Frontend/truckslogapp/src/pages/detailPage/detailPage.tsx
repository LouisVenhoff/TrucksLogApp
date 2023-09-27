import React, { useEffect, useState } from "react";
import "./detailPageStyle.css";
import Header from "../../components/header/header";
import HamburgerMenu from "../../components/hamburgerMenu/hamburgerMenu";
import { HamburgerIcon } from "@chakra-ui/icons";
import useMenu from "../../hooks/useMenu";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import TourProgressView from "./tourProgressView/tourProgressView";
import Tour from "../../claases/tour/tour";
import ApiController from "../../claases/controller/apiController";
import useTour from "../../hooks/useTour";
import {useSelector} from "react-redux";


type DetailPageProps = {
    api:ApiController
}


const DetailPage:React.FC<DetailPageProps> = ({api}) => 
{

    const[tourObj, setTourObj] = useState<Tour>()
    
    const [full, setFull] = useState<number>(0);
    const [traveled, setTraveled] = useState<number>(0);


    const tourData:any = useTour();
    const menu = useMenu();

    const userRedux:any = useSelector((state:any) => state.user.value);


    useEffect(() => {
        fetchTourData(tourData.tourId);
    },[]);

    useEffect(() => {
        if(tourObj !== undefined)
        {
            setFull(tourObj.fullDistance);
            setTraveled(tourObj.fullDistance - tourObj.restDistance);
        }
    },[tourObj]);


    const openMenu = () => 
    {
        menu.showMenu(true);
    }


    const fetchTourData = async (id:number) => 
    {
        let fetchedTour = await api.LoadSingleTour(userRedux.id,id, userRedux.clientKey);
        setTourObj(fetchedTour);
    }


    return(
    <div className="DetailPageMainDiv">
        <div className="DetailPageHeaderDiv">
            <Header />
        </div>
        <div className="DetailPageHamburgerBtnDiv">
            <HamburgerIcon boxSize={10} onClick={() => {openMenu()}}/>
        </div>
        <div className="DetailPageTourProgress">
           <TourProgressView fullDistance={full} traveledDistance={traveled} />
        </div>
    </div>
    );
}

export default DetailPage;