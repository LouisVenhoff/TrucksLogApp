import {useSelector, useDispatch} from "react-redux";
import { switchPage } from "../features/page";
import {useState, useEffect} from "react";
import { Pages } from "../enums/pages";

export default function usePage()
{
    const [currentPage, setCurrentPage] = useState<Pages>(Pages.LOGIN);

    const dispatch = useDispatch();

    const pageRedux = useSelector((state:any) => state.page.value);



    const loadPage = (page:Pages) => {
        
        
        let nextPage:Pages;
        
        if(page === Pages.LAST_PAGE)
        {   
            setCurrentPage(pageRedux.lastPage);
            nextPage = pageRedux.lastPage;
        }
        else
        {
            setCurrentPage(page);
            nextPage = page;
        }
        
        dispatch(switchPage(nextPage));
    }

    return{currentPage, loadPage}


}