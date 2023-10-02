class UserObj
{
    private id:number;
    private name:string;
    private email:string;
    private password:string;
    private clientKey:string;
    private avatar:string;
    private billPermission:boolean;

    constructor(id:number, name:string, email:string,password:string, clientKey:string, avatar:string, billPermission:boolean)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.clientKey = clientKey;
        this.avatar = avatar;
        this.billPermission = billPermission;
    }

    public getReduxObj():{id:number, name:string, email:string, clientKey:string, avatar:string, billPermission:boolean}
    {
        return{id:this.id, name:this.name, email:this.email, clientKey:this.clientKey, avatar:this.avatar, billPermission:this.billPermission}
    }

}

export default UserObj;