import React from "react";
import "./creditsPageStyle.css";
import Header from "../../components/header/header";
import {Browser} from "@capacitor/browser";
import { HamburgerIcon } from "@chakra-ui/icons";
import useMenu  from "../../hooks/useMenu";

const CreditsPage: React.FC = () => {
    
    const menu = useMenu();


    const showWebPage = async (link:string) => 
    {
        await Browser.open({url: link});
    }
    
    const openMenu = () => 
    {
        menu.showMenu(true);
    }
    
    return (
        <div className="CreditsPageMainDiv">
            <div className="CreditsPageHeaderDiv">
                <Header />
            </div>
            <div className="CreditsPageHamburgerMenuButton">
                <HamburgerIcon boxSize={10} onClick={() => {openMenu()}}/>
            </div>
            <div className="CreditsPageContentDiv">
                <div>
                    <h1>Verantwortliche</h1>
                    <h2>Matthias Stoppek</h2>
                    <h2>Thommy</h2>
                </div>

                <div>
                    <h1>Entwicklung</h1>
                    <h2>Thommy</h2>
                    <h2>Louis Venhoff</h2>
                </div>

                <div>
                    <h1>Design</h1>
                    <h2>Louis Venhoff</h2>
                    <h2>Mattn80</h2>
                </div>

                <div>
                    <h1>Icons</h1>
                    <h2 onClick={() => {showWebPage("https://icons8.com/")}}>Icons8</h2>
                </div>

                <div className="CreditsPageCopyrightDiv">
                    <p>{`Copyright© 2019 - ${new Date().getFullYear()}`} by Thommy</p>
                </div>
            </div>

        </div>
    );
}


export default CreditsPage;