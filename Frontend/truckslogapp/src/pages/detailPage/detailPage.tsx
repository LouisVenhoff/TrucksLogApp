import React from "react";
import "./detailPageStyle.css";
import Header from "../../components/header/header";
import HamburgerMenu from "../../components/hamburgerMenu/hamburgerMenu";
import { HamburgerIcon } from "@chakra-ui/icons";
import useMenu from "../../hooks/useMenu";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import TourProgressView from "./tourProgressView/tourProgressView";
import Tour from "../../claases/tour/tour";
import ApiController from "../../claases/controller/apiController";



type DetailPageProps = {
    api:ApiController
}


const DetailPage:React.FC<DetailPageProps> = ({api}) => 
{

    const menu = useMenu();

    const openMenu = () => 
    {
        menu.showMenu(true);
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