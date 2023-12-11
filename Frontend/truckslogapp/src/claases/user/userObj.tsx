import TourData from "../tourData/tourData";
import ApiController from "../controller/apiController";
import Tour from "../tour/tour";

class UserObj extends TourData
{
    public id:number;
    public name:string;
    public avatar:string;
    protected email:string;
    protected password:string;
    protected clientKey:string;
    protected billPermission:boolean;
    protected tours:Tour[] = [];

    private api:ApiController;

    constructor(id:number, name:string, email:string, password:string, clientKey:string, avatar:string, billPermission:boolean, api:ApiController)
    {
        super();
        this.id = id;
        this.name = name;
        this.clientKey = clientKey;
        this.email = email;
        this.password = password;
        this.clientKey = clientKey;
        this.avatar = avatar;
        this.billPermission = billPermission;
        this.api = api;
    }

    public getReduxObj():{id:number, name:string, email:string, clientKey:string, avatar:string, billPermission:boolean}
    {
        return{id:this.id, name:this.name, email:this.email, clientKey:this.clientKey, avatar:this.avatar, billPermission:this.billPermission}
    }

    async updateTours()
    {
        if(this.id === 0)
        {
            return [];
        }

        this.tours = await this.api.LoadTours(this.id, this.clientKey);
        return this.tours;
    }

}

export default UserObj;