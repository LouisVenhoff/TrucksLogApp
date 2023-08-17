import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import { switchLoadingScreen } from "../features/loadingScreen";

export default function useLoader()
{

    const dispatch = useDispatch();


    const controlLoader = (state:boolean) => 
    {
        dispatch(switchLoadingScreen(state));
    }


    return {controlLoader}

}