import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./tourPageStyle.css";
import TourDisplay from "../../components/TourDisplay/tourDisplay";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import TrucksLogLogo from "../../resources/TrucksLogLogo.png";

import {motion, useMotionValueEvent, useScroll} from "framer-motion";

type TourPageProps = {
  accountName: string;
};

const TourPage: React.FC<TourPageProps> = ({ accountName }) => {
  
    const elementRef = useRef(null);

    const {scrollYProgress} = useScroll({container:elementRef});

    const [scrollRate, setScrollRate] = useState<number>(1);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrollRate(latest);
      })
      
    const calculateAvatarSize = (scrollRate:number):number => 
    {
        return 1 - scrollRate;
    }


return (
    <div ref={elementRef} className="TourPageMainDiv">
      {/* <div className="TourPageBackBtn">
        <ArrowLeftIcon boxSize={6} />
      </div> */}
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
