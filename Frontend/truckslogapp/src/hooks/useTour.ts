import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {select} from "../features/tourData";

export default function useTour() 
{
    
    
    const tourRedux = useSelector((state:any) => state.tour.value);

    const [currentTourId, setCurrentTourId] = useState<number>(tourRedux.tourId);

    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentTourId(tourRedux.tourId);
    },[tourRedux.tourID]);


    const setTour = (id:number) => 
    {   
        select(id);
    }


}