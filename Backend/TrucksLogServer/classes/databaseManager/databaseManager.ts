import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Config } from "../configReader/configReader";

class DatabaseManager
{

    private hostName: string;
    private userName: string;
    private password: string;
    private databaseName: string;


    constructor(databaseConfig:Config)
    {
        this.hostName = databaseConfig.dbHostname;
        this.userName = databaseConfig.dbUsername;
        this.password = databaseConfig.dbPassword;
        this.databaseName = databaseConfig.dbName;
    }

    



}