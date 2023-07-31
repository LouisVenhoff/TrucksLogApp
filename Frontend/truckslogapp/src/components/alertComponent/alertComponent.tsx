import React, { useEffect, useState } from "react";
import "./alertComponentStyle.css";
import { motion } from "framer-motion";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";


type AlertComponentProps = {
  isOpen: boolean;
  text: string;
  type:AlertType;
};

export enum AlertType  {
  WARNING,
  ERROR,
  INFO,
  SUCCESS
}

const alertVariants = {
  open: { top: 0 },
  closed: { top: -75 },
};

const AlertComponent: React.FC<AlertComponentProps> = ({
  isOpen,
  text,
  type
}) => {
  const [isOpenState, setIsOpenState] = useState<boolean>(isOpen);
  const [message, setMessage] = useState<string>(text);
  const [alertType, setAlertType] = useState<any>("info");


  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setMessage(text);
  }, [text]);

  useEffect(() => {
      resolveAlertType(type);
  }, [type]);


  const resolveAlertType = (input:AlertType) => {
      switch(input){
        case AlertType.ERROR:
            setAlertType("error");
          break;
        case AlertType.INFO:
            setAlertType("info");
          break;
        case AlertType.SUCCESS:
            setAlertType("success");
          break;
        case AlertType.WARNING:
            setAlertType("warning");
          break;
      }
  }

  return (
    <motion.div
      className="AlertComponentDiv"
      initial={{ top: -75 }}
      animate={isOpen ? "open" : "closed"}
      variants={alertVariants}
      transition={{ delay: 5 }}
    >
      <Alert
        position="absolute"
        status={alertType}
        flex-direction="row"
        justifyContent="center"
        height="75px"
      >
        <AlertIcon />
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    </motion.div>
  );
};

export default AlertComponent;
