class UserObj
{
    private id:number;
    private name:string;
    private email:string;
    private password:string;
    private clientKey:string;
    private avatar:string;

    constructor(id:number, name:string, email:string,password:string, clientKey:string, avatar:string)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.clientKey = clientKey;
        this.avatar = avatar;
    }

    public getReduxObj():{id:number, name:string, email:string, clientKey:string, avatar:string}
    {
        return{id:this.id, name:this.name, email:this.email, clientKey:this.clientKey, avatar:this.avatar}
    }

}

export default UserObj;