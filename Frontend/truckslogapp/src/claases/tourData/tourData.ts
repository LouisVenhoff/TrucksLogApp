import Company from "../company/company";
import Tour from "../tour/tour";

abstract class TourData
{
    protected abstract id:number;
    protected abstract name:string;
    protected abstract avatar:string;

    protected abstract tours:Tour[];

    

    public abstract get companyObj():Company
    public abstract updateTours():Promise<Tour[]>;
   



}

export default TourData;