import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/loginPage/loginPage';
import TourPage from "./pages/tourPage/tourPage";
import ApiController from './claases/controller/apiController';
import AlertComponent, { AlertType } from './components/alertComponent/alertComponent';
import AlertProvider from './components/alertProvider/alertProvider';
import Toaster from './claases/toaster/toaster';
import HamburgerMenu from './components/hamburgerMenu/hamburgerMenu';


import UserObj from './claases/user/userObj';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

import { login } from './features/user';
import { switchPage } from './features/page';

import { Pages } from './enums/pages';


//Backdrop
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from '@chakra-ui/react'

function App() {

  const user: any = useSelector((state: any) => state.user.value);
  const currentPage = useSelector((state: any) => state.page.value);
  const loadingScreen = useSelector((state:any) => state.loadingScreen.value);
  const menu = useSelector((state:any) => state.menu.value);


  const [activePage, setActivePage] = useState<JSX.Element>();
  const [laodingScreenOpened, setLoadingScreenOpened] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);



  useEffect(() => {
    loadPage(currentPage.page);
  }, [currentPage]);

  useEffect(() => {

      setLoadingScreenOpened(loadingScreen.isShowed);

  },[loadingScreen]);

  useEffect(() => {

      setMenuOpened(menu.opened);

  },[menu]);


  const api = new ApiController("localhost", 3000);

  const dispatch = useDispatch();



  const loadPage = (page: Pages) => {
    switch (page) {
      case Pages.LOGIN:
        setActivePage(<LoginPage api={api} />);
        break;
      case Pages.TOUR_LIST:
        setActivePage(<TourPage api={api} />);
        break;
      case Pages.TOUR_DETAIL:
        break;
    }
  }




  return (
    <div className="App">
      <AlertProvider />
      <Modal isOpen={laodingScreenOpened} onClose={() => { }} size="xs">
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)'>
          <ModalContent>
            <ModalHeader>LadeDaten . . .</ModalHeader>
            <ModalBody style={{display:"flex", justifyContent:"center"}}>
              <Spinner thickness='4px' size='xl' margin={100} />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      <HamburgerMenu isOpen={menuOpened} />
      {/* <TourPage accountName="Driver" avatarStr="https://abload.de/img/2000tojen.png" userTours={[]}/> */}
      {activePage}
    </div>
  );
}

export default App;
