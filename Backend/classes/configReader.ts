var fs =  require("fs");


export type Config = {
   port:number,
   dbName:string,
   dbHostname:string,
   dbUsername:string,
   dbPassword:string,
}

const defaultConfig:Config = 
{
    port: 3000,
    dbName: "",
    dbHostname:"",
    dbUsername:"",
    dbPassword:""
}



class ConfigReader{
    private path:string

    constructor(path:string)
    {
        this.path = path;
        this.initReader();
    }


    private initReader()
    {
        //TODO: Check if file is there, when not create File
         
        fs.open(this.path,"r", (err, fd:number) => 
        {
            if(err)
            {
               this.createDefaultConfig();
            }
            fs.close(fd);
        });

        
    }

    private createDefaultConfig(){
        fs.appendFile(this.path, JSON.stringify(defaultConfig), (err) => {
            if(err){
                throw(err)
            }
            console.log("Created a new Config file! Pleas edit it and add your config!");
        })
    }



}


export default ConfigReader;