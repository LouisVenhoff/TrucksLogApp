import React from "react";
import "./tourPageStyle.css";
import TourDisplay from "../../components/TourDisplay/tourDisplay";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import TrucksLogLogo from "../../resources/TrucksLogLogo.png";

type TourPageProps = {
  accountName: string;
};

const TourPage: React.FC<TourPageProps> = ({ accountName }) => {
  return (
    <div className="TourPageMainDiv">
      {/* <div className="TourPageBackBtn">
        <ArrowLeftIcon boxSize={6} />
      </div> */}
      <div className="TourPageAvatarDiv">
            <img src={TrucksLogLogo} />
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
