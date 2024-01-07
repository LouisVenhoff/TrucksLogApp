import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./tourPageStyle.css";
import TourDisplay from "../../components/TourDisplay/tourDisplay";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import TrucksLogLogo from "../../resources/TrucksLogLogo.png";
import Header from "../../components/header/header";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import { switchLoadingScreen } from "../../features/loadingScreen";

import {motion, useMotionValueEvent, useScroll} from "framer-motion";
import Tour, { CalcState } from "../../claases/tour/tour";
import ApiController from "../../claases/controller/apiController";
import Toaster from "../../claases/toaster/toaster";
import { AlertType } from "../../components/alertComponent/alertComponent";
import useMenu from "../../hooks/useMenu";

import {HamburgerIcon} from "@chakra-ui/icons";
import useLoader from "../../hooks/useLoader";
import { Interactions } from "../../enums/interactions";
import useTour from "../../hooks/useTour";
import usePage from "../../hooks/usePage";
import { Pages } from "../../enums/pages";
import TourData from "../../claases/tourData/tourData";
import UserObj from "../../claases/user/userObj";
import Company from "../../claases/company/company";

type TourPageProps = {
  api:ApiController
  pageContent:TourData,
};

const AVATAR_HIDE_POSITION:number = 0.945;
const AVATAR_HIDE_BOTTOM:number = -300;
const SCROLL_ELEMENTS_THRESHOLD = 3;
//const SYNC_TIME = 60000;
const SYNC_TIME = 3000;
let syncInterval:any;

//Loader
const SHOW_LOADER_TIME = 750;
let loadingTimeout:any;

const TourPage: React.FC<TourPageProps> = ({api, pageContent}) => {

    const currentUserRedux = useSelector((state:any) => state.user.value);

    //const [contentObj, setContentObj] = useState<TourData>(pageContent);
    const contentObj:any = useRef<TourData>(pageContent);
    const elementRef = useRef(null);

    const menu = useMenu();
    const loader = useLoader();


    const pageController = usePage();
    const tourData = useTour();

    //Animation
    const {scrollYProgress} = useScroll({container:elementRef});
    const [scrollRate, setScrollRate] = useState<number>(1);
    const [headerOpacity, setHeaderOpacity] = useState<number>(0);
    //Tours
    const [tours, setTours] = useState<Tour[]>([]);
   
    const [infoText, setInfoText] = useState<string>("Noch keine Fahrten!");


    //Player information
    const [avatarSize, setAvatarSize] = useState<number>(1);
    const [avatarPosition, setAvatarPosition] = useState<number>(0);

    const [isCompanyPage, setIsCompanyPage] = useState<boolean>(pageContent instanceof Company);

    useEffect(() => {

      //TODO:Load all Tours
      // Parse Tours to Tour Obj
      // Load Tours in tours state
      loadTours();
      
    },[]);

    useEffect(() => {
      //setContentObj(pageContent);
      contentObj.current = pageContent;
      loadTours();
      setIsCompanyPage(contentObj.current instanceof UserObj);
      
    },[pageContent]);



    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if(tours.length > SCROLL_ELEMENTS_THRESHOLD)
        {
          calculateAvatarTransform(latest, AVATAR_HIDE_POSITION);
          calculateHeaderOpacity(latest, 10);
        }
      })

    useEffect(() => {
        syncInterval = setInterval(() => {
          loadTours();
        },SYNC_TIME)

        return(() => {
          clearInterval(syncInterval);
        });
    },[]);


    useEffect(() => {
      

      if(tours.length === 0)
      {
        setInfoText("Noch keine Fahrten");
      }
      else
      {
        setInfoText("");
      }
    },[tours]);

    const calculateAvatarTransform = (scrollRate:number, displayThreashold:number) => 
    {
        let sizeFactor:number = 1 - scrollRate;
        if(sizeFactor < displayThreashold)
        {
            setAvatarPosition(AVATAR_HIDE_BOTTOM);
        }else
        {
          setAvatarPosition(0);
          setAvatarSize(sizeFactor);
        }
    }

    
    const calculateHeaderOpacity = (scrollRate:number, factor:number) => {

        if(avatarPosition === AVATAR_HIDE_BOTTOM)
        {
            setHeaderOpacity(scrollRate * factor);
        }
        else
        {
          setHeaderOpacity(0);
        } 
    }



    const loadTours = async () =>
    {
        
        let tourArr:Tour[] = await contentObj.current.updateTours();
        setTours(tourArr);
        
    }

    const interactionsHandler = (id:number, type:Interactions) => 
    {

      switch(type){
        case Interactions.CALCULATE:
            calculateTour(id);
        break;
        case Interactions.VIEW:
            showTour(id);
          break;
      }

    }

    const showTour = (tourId:number) => 
    {
        tourData.setTour(tourId);
        pageController.loadPage(Pages.DETAIL_PAGE);   
    }

    const calculateTour = async (tourId:number) => 
    {
         startLoading()
        
          let result:CalcState = await api.calcTour(currentUserRedux.id, tourId, contentObj.current.companyObj.id, currentUserRedux.clientKey);
  
          if(result !== CalcState.TOUR_OK)
          {
            Toaster.show("Fehler beim abrechenen", AlertType.ERROR,1000);
          }

          loadTours();

         stopLoading();
    }

    //Loader
    const startLoading = () => 
    {
        loadingTimeout = setTimeout(() => {loader.controlLoader(true);}, SHOW_LOADER_TIME);
    }

    const stopLoading = () => 
    {
        clearTimeout(loadingTimeout);
        loader.controlLoader(false);
    }



return (
    <div ref={elementRef} className="TourPageMainDiv">
      <motion.div className="TourPageHeaderDiv" style={{opacity:(headerOpacity)}}>
        <Header />
      </motion.div>
      <div className="TourPageMenuButtonDiv">
          <HamburgerIcon  boxSize={10} onClick={() => {menu.showMenu(true)}}/>
      </div>
      <div className="TourPageAvatarDiv">
            <motion.img  style={{scale: avatarSize, borderRadius:10}} animate={{y:avatarPosition}}  src={contentObj.current.avatar} />
      </div>
      <div className="TourPageWelcomeTextDiv">
        <h1>{isCompanyPage ? "Willkommen, " : ""}{contentObj.current.name}</h1>
      </div>
      <div className="TourPageDataTableSpace">
            <TourDisplay noDataText={infoText} tourData={tours} interactionCallback={(id:number, type:Interactions) => {interactionsHandler(id, type)}}  />
      </div>
    </div>
  );
};

export default TourPage;
