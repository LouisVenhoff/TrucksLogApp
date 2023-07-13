var fs =  require("fs");
var process = require("process");


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
    private loadedConfig:Config;

    private syncCallback:(conf:Config) => void;

    constructor(path:string, syncCallback:(conf:Config) => void)
    {
        this.path = path;
        this.initReader();
        this.syncCallback = syncCallback;
    }


    public getConfig():Config | null{

        if(this.loadedConfig !== undefined){
            return this.loadedConfig;
        }
        else{
            return null;
        }


    }



    private async initReader()
    {
        //TODO: Check if file is there, when not create File
         
        await fs.open(this.path,"r", async (err, fd:number) => 
        {
            if(err)
            {
                this.createDefaultConfig();
               
            }
            else
            {
                fs.close(fd);
                this.loadedConfig = await this.syncConfig();
                this.syncCallback(this.loadedConfig);
            }
           
          
        });



        
    }

    private async createDefaultConfig(){
        await fs.writeFile(this.path, JSON.stringify(defaultConfig), (err) => {
            if(err){
                throw(err)
            }
            console.log("Created a new Config file! Pleas edit it and add your config!");
            process.exit(0);
        })
       
    }

    private async syncConfig():Promise<Config>{
        
        return new Promise<Config>(async (resolve, reject) => {

            fs.readFile(this.path, "utf8", (err, data) => {

                if(err){
                    reject(err);
                }
                resolve(JSON.parse(data));
            })
        });


    }



}


export default ConfigReader;