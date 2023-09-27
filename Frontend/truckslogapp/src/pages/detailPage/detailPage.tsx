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



type DetailPageProps = {
    api:ApiController
}


const DetailPage:React.FC<DetailPageProps> = ({api}) => 
{

    const[tourObj, setTourObj] = useState<Tour>()
    
    const tourData:any = useTour();
    const menu = useMenu();

    useEffect(() => {
        fetchTourData(tourData.tourId);
    },[]);

    const openMenu = () => 
    {
        menu.showMenu(true);
    }


    const fetchTourData = async (id:number) => 
    {
        //TODO:Load all the tour data from id
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
           <TourProgressView fullDistance={200} traveledDistance={26} />
        </div>
    </div>
    );
}

export default DetailPage;