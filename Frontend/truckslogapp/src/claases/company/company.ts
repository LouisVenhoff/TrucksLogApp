import ApiController from "../controller/apiController";
import Tour from "../tour/tour";
import TourData from "../tourData/tourData";
import { CompanyObj } from "../controller/apiController";
//Need Refactoring
class Company extends TourData
{
    private _id:number = 0;
    private _name:string = "";
    private _avatar:string = "";
    private _tours:Tour[] = [];

    private userId:number;
    private userClientKey:string;

    private api:ApiController;

    private isInitialized:boolean = false;

    constructor(userId:number, userClientKey:string , api:ApiController)
    {
        super();
        this.userId = userId;
        this.userClientKey = userClientKey;
        this.api = api;

        this.initializeCompany();

    }

    public get id():number
    {
        return this._id
    }

    public set id(id:number){}

    public get name():string
    {
        return this._name;
    }

    public set name(name:string){}

    public get avatar():string
    {
        return this._avatar;
    }

    public set avatar(avatar:string){}

    public get tours():Tour[]
    {
        return this._tours; 
    }

    public set tours(tours:Tour[]){}

    public async updateTours():Promise<Tour[]>
    {
        if(!this.isInitialized)
        {
            await this.initializeCompany();
        }
        
        return new Promise(async(resolve, reject) => {
            
            if(this._id === 0)
            {
                resolve([]);
            }
            this._tours = await this.api.LoadCompanyTours(this.userId, this.userClientKey, this.id)
            resolve(this._tours);
        });
    }

    public async initializeCompany()
    {

        if(this.userId === 0)
        {
            return;
        }
        let data:CompanyObj = await this.api.LoadCompanyData(this.userId, this.userClientKey);
        this._id = data.companyId;
        this._name = data.name;
        this._avatar = data.avatar;

        this.isInitialized = true;
    }
    
}

export default Company;