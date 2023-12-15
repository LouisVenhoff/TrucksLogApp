import React, { useEffect, useState } from "react";
import "./hamburgerMenuStyle.css";
import MenuButton from "./menuButton/menuButton";
import {Browser} from "@capacitor/browser";

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'


  import LoginDataStorage from "../../claases/loginDataStorage/loginDataStorage";
  import { useDispatch } from "react-redux";
  import { switchPage } from "../../features/page";
  import { Pages } from "../../enums/pages";
import usePage from "../../hooks/usePage";



type HamburgerMenuProps  = {
    isOpen:boolean
    closeCallback?:() => void
}

const HamburgerMenu:React.FC<HamburgerMenuProps> = ({isOpen, closeCallback}) =>
{
    const [open, setOpen] = useState<boolean>(false);

    const pageManager = usePage();

    useEffect(() => {
        setOpen(isOpen);
    },[isOpen]);



    const closeMenu = () => 
    {
        setOpen(false);
        if(closeCallback !== undefined)
        {
            closeCallback();
        }
    }

    const showUserTourPage = () => 
    {
        closeMenu();
        pageManager.loadPage(Pages.TOUR_LIST_USER);
    }

    const showCompanyTourPage = () => 
    {
        closeMenu();
        pageManager.loadPage(Pages.TOUR_LIST_COMPANY);
    }


    const redirectImprint = async() => {
        await Browser.open({url: "https://www.truckslog.de/?s=SYSTEM/impressum"});
    }

    const redirectDataSec = async() => {
        await Browser.open({url: "https://www.truckslog.de/?s=SYSTEM/datenschutz"});
    }
    

    const showCredits = () => {
        closeMenu();
        pageManager.loadPage(Pages.CREDITS);
    }


    const logout = () => {
        //TODO: clear Login store
        closeMenu();
        let storageInterface:LoginDataStorage = new LoginDataStorage();
        storageInterface.clearData();
        pageManager.loadPage(Pages.LOGIN);
    }


    return(

        <Drawer isOpen={open} placement="left" onClose={closeMenu}>
            <DrawerOverlay/>
            {/* <DrawerContent style={{backgroundColor:"#595c5f"}}> */}
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menü</DrawerHeader>
                <DrawerBody className="HamburgerBody">
                    <MenuButton name="Meine Touren" onClick={showUserTourPage} />
                    <MenuButton name="Meine Spedition" onClick={showCompanyTourPage} />
                    <MenuButton name="Impressum" onClick={redirectImprint} />
                    <MenuButton name="Datenschutz" onClick={redirectDataSec} />
                    <MenuButton name="Credits" onClick={showCredits}/>
                    <MenuButton name="Logout" onClick={logout}/>
                </DrawerBody>
            </DrawerContent>
        </Drawer>

    );
}

export default HamburgerMenu;