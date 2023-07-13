import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Config } from "../configReader/configReader";
const mysql = require("mysql");

class DatabaseManager
{

    private hostName: string;
    private userName: string;
    private password: string;
    private databaseName: string;
    private connected:boolean = false;


    private dbConnection:any;

    


    constructor(databaseConfig:Config, autoConnect:boolean)
    {
        this.hostName = databaseConfig.dbHostname;
        this.userName = databaseConfig.dbUsername;
        this.password = databaseConfig.dbPassword;
        this.databaseName = databaseConfig.dbName;
    
        this.dbConnection = null;

        if(autoConnect){
            this.connect();
        }

    }

    public connect()
    {

        if(!this.connected){
            this.dbConnection = mysql.createConnection({
                host: this.hostName,
                user: this.userName,
                password: this.password
            });
        }

        this.dbConnection.connect((err) => {

            if(err){
                console.log("Database connection error occured!");
                console.log(err.stack);
                throw(err);
            }

            this.connected = true;

            console.log(`Connected to ${this.databaseName}`);
        });

    }

    



}

export default DatabaseManager;