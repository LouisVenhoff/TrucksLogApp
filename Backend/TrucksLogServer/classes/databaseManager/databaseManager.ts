import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Config } from "../configReader/configReader";
const mysql = require("mysql");

class DatabaseManager {

    private hostName: string;
    private userName: string;
    private password: string;
    private databaseName: string;
    private connected: boolean = false;


    private dbConnection: any;




    constructor(databaseConfig: Config, autoConnect: boolean) {
        this.hostName = databaseConfig.dbHostname;
        this.userName = databaseConfig.dbUsername;
        this.password = databaseConfig.dbPassword;
        this.databaseName = databaseConfig.dbName;

        this.dbConnection = null;

        if (autoConnect) {
            async () => {await this.connect()};
        }

    }

    public async connect() {

        if (!this.connected) {
            this.dbConnection = mysql.createConnection({
                host: this.hostName,
                user: this.userName,
                password: this.password,
                database: this.databaseName
            });
        }

        this.dbConnection.connect(async (err) => {

            if (err) {
                console.log("Database connection error occured!");
                console.log(err.stack);
                throw (err);
            }

            this.connected = true;

            console.log(`Connected to ${this.databaseName}`);

           await this.processLogin("Password!");
        });

    }

    public async processLogin(pwdHash: string):Promise<number> {

        let databaseResult:any = await this.runQuery(`SELECT id FROM user WHERE passwort = "${pwdHash}"`);
        
        let userId = -1;

        if(databaseResult.length > 0)
        {
            userId = parseInt(databaseResult[0].id);
        }

        console.log(userId);

        return new Promise((resolve, reject) => {
            resolve(userId);
        });

    }

    private async runQuery(query: string): Promise<any> {

        if (this.connected) {
            this.dbConnection.query(query, (err: any, results: any, fields: any) => {
                if (err) {
                    throw (err);
                }
                return new Promise((resolve, reject) => {
                    resolve(results);
                });

            });
        }
        else {
            throw ("Try to query but database is not connected");
        }
    }





}

export default DatabaseManager;