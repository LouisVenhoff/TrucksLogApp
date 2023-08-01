import { AlertType } from "../../components/alertComponent/alertComponent";

class Toaster
{

    public static toasterCallback:(message:string, type:AlertType, displayDuration:number) => void;

    
    public static async show(message:string, type:AlertType, displayDuration:number)
    {   
        Toaster.toasterCallback(message, type, displayDuration);
    }

    

    

}

export default Toaster;