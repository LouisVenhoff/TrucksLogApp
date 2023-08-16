import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setOpened} from "../features/menu";


export default function useMenu()
{

    const menuRedux = useSelector((state:any) => state.menu.value);
    const [menuOpened, setMenuOpened] = useState<boolean>(menuRedux.opened);

    const dispatch = useDispatch();


    useEffect(() => {
        setMenuOpened(menuRedux.opened);
    },[menuRedux]);
    

    const toggleMenu = () => 
    {
        dispatch(setOpened(!menuOpened));
    }

    return {menuOpened, toggleMenu};

}