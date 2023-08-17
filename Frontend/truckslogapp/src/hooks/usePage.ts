import {useSelector, useDispatch} from "react-redux";
import { switchPage } from "../features/page";
import {useState, useEffect} from "react";
import { Pages } from "../enums/pages";

export default function usePage()
{
    const [currentPage, setCurrentPage] = useState<Pages>(Pages.LOGIN);

    const dispatch = useDispatch();


    const loadPage = (page:Pages) => {
        setCurrentPage(page);
        dispatch(switchPage(page));
    }

    return{currentPage, loadPage}


}