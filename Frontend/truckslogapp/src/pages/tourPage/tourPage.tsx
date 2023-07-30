import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./tourPageStyle.css";
import TourDisplay from "../../components/TourDisplay/tourDisplay";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import TrucksLogLogo from "../../resources/TrucksLogLogo.png";
import Header from "../../components/header/header";

import {motion, useMotionValueEvent, useScroll} from "framer-motion";
import Tour from "../../claases/tour/tour";

type TourPageProps = {
  accountName: string;
  avatarStr: string;
  userTours: Tour[];
};

const AVATAR_HIDE_POSITION:number = 0.945;
const AVATAR_HIDE_BOTTOM:number = -300;

const TourPage: React.FC<TourPageProps> = ({ accountName, avatarStr,  userTours}) => {
  
    const elementRef = useRef(null);

    //Animation
    const {scrollYProgress} = useScroll({container:elementRef});
    const [scrollRate, setScrollRate] = useState<number>(1);
    const [headerOpacity, setHeaderOpacity] = useState<number>(0);
    //Tours
    const [tours, setTours] = useState<Tour[]>(userTours);
    const [tourElements, setTourElements] = useState<JSX.Element[]>([]);


    //Player information
    const [avatarSize, setAvatarSize] = useState<number>(0);
    const [avatarPosition, setAvatarPosition] = useState<number>(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        calculateAvatarTransform(latest, AVATAR_HIDE_POSITION);
        calculateHeaderOpacity(latest, 10);
      })

    useEffect(() => {
      updateElements(tours);
    },[tours]);

// updateElements checks for changes in the tours array. When change events occure, the displayed tours will update
    const updateElements = (tourData:Tour[]) =>
    {
      let tempElements:JSX.Element[] = [];

      for(let i = 0; i < tourData.length; i++)
      {
        tempElements.push(transformTour(tourData[i]));
      }

      setTourElements(tempElements);

    }
    const transformTour = (tour:Tour):JSX.Element =>{

        return(<TourDisplay tour={tour}/>);

    } 

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


return (
    <div ref={elementRef} className="TourPageMainDiv">
      <motion.div className="TourPageHeaderDiv" style={{opacity:(headerOpacity)}}>
        <Header />
      </motion.div>
      <div className="TourPageAvatarDiv">
            <motion.img style={{scale: avatarSize}} animate={{y:avatarPosition}}  src={avatarStr} />
      </div>
      <div className="TourPageWelcomeTextDiv">
        <h1>Willkommen, {accountName}</h1>
      </div>
      <div className="TourPageDataTableSpace">
            {tourElements}
      </div>
    </div>
  );
};

export default TourPage;
