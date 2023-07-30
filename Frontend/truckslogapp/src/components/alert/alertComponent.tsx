import React, { useEffect, useState } from "react";
import "./alertComponentStyle.css";
import { motion, AnimatePresence } from "framer-motion";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const AlertComponent: React.FC = () => {
  
   const[visible, setVisible] = useState<boolean>(false);
  
   useEffect(() => {

    setTimeout(() => {

      setVisible(!visible);

    }, 10000);

   },[]);
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="AlertComponentDiv" initial={{top:-75}} animate={{top:0}} transition={{delay:5}} exit={{top:-75}}>
      <Alert position="absolute" status="error" flex-direction="row" justifyContent="center" height="75px">
        <AlertIcon />
        <AlertTitle>Login fehlgeschlagen!</AlertTitle>
      </Alert>
    </motion.div>)}
    </AnimatePresence>
    
  );
};

export default AlertComponent;
