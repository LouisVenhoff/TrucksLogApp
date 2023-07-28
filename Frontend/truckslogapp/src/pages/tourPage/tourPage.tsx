import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./tourPageStyle.css";
import TourDisplay from "../../components/TourDisplay/tourDisplay";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import TrucksLogLogo from "../../resources/TrucksLogLogo.png";
import Header from "../../components/header/header";

import {motion, useMotionValueEvent, useScroll} from "framer-motion";

type TourPageProps = {
  accountName: string;
};

const TourPage: React.FC<TourPageProps> = ({ accountName }) => {
  
    const elementRef = useRef(null);

    const {scrollYProgress} = useScroll({container:elementRef});
    const [scrollRate, setScrollRate] = useState<number>(1);
    const [headerOpacity, setHeaderOpacity] = useState<number>(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrollRate(latest);
        calculateHeaderOpacity(latest);
      })
      
    const calculateAvatarSize = (scrollRate:number):number => 
    {
        return 1 - scrollRate;
    }

    const calculateHeaderOpacity = (scrollRate:number) => {
        setHeaderOpacity(scrollRate * 3);
    }


return (
    <div ref={elementRef} className="TourPageMainDiv">
      <motion.div className="TourPageHeaderDiv" style={{opacity:(headerOpacity)}}>
        <Header />
      </motion.div>
      <div className="TourPageAvatarDiv">
            <motion.img style={{scale: calculateAvatarSize(scrollRate)}}  src={TrucksLogLogo} />
      </div>
      <div className="TourPageWelcomeTextDiv">
        <h1>Willkommen, {accountName}</h1>
      </div>
      <div className="TourPageDataTableSpace">
            <TourDisplay/>
      </div>
    </div>
  );
};

export default TourPage;
