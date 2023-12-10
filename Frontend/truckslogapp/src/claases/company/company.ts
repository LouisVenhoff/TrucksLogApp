import Tour from "../tour/tour";

class Company
{
    private id:string;
    private name:string;
    private avatar:string;
    private tours:Tour[] = [];

    constructor(id:string, name:string, avatar:string)
    {
        this.id = id;
        this.name = name;
        this.avatar = avatar;

    }
    
}

export default Company;