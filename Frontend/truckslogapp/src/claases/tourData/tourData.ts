import Company from "../company/company";
import Tour from "../tour/tour";

abstract class TourData
{
    public abstract id:number;
    public abstract name:string;
    public abstract avatar:string;

    protected abstract tours:Tour[];

    

    public abstract get companyObj():Company
    public abstract updateTours():Promise<Tour[]>;
   



}

export default TourData;