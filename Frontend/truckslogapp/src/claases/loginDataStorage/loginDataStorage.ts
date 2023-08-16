import { Preferences } from "@capacitor/preferences";


class LoginDataStorage
{

    private email:string = "";
    private password:string = "";

    public async storeData(email:string, password:string)
    {
        this.email = email;
        this.password = password;

        await Preferences.set({
            key: "mail",
            value: this.email
        });

        await Preferences.set({
            key:"pwd",
            value:this.password
        });

    }

    public async loadData():Promise<any>
    {
        let email = await Preferences.get({key:"mail"});
        let pwd = await Preferences.get({key:"pwd"});


        return new Promise((resolve, reject) => {
            resolve({email:email.value, password:pwd.value});
        });
    }

    public async clearData()
    {
        await Preferences.remove({key:"mail"});
        await Preferences.remove({key:"pwd"});
    }

}

export default LoginDataStorage;