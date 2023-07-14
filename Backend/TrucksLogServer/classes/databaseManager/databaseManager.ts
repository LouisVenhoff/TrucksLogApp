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
            this.connect();
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


        });

    }

    public async processLogin(user:string, pwdHash: string): Promise<number> {

        let databaseResult: any = await this.runQuery(`SELECT id FROM user WHERE email= ? AND passwort = ? `, user, pwdHash);

        let userId = -1;

        if(databaseResult.length > 0)
        {
            userId = parseInt(databaseResult[0].id);
        }

        return new Promise((resolve, reject) => {
            resolve(userId);
        });

    }

    private async runQuery(query: string, ...args): Promise<any> {


        return new Promise((resolve, reject) => {
            if (this.connected) {
                this.dbConnection.query(query,args, (err: any, results: any, fields: any) => {
                    if (err) {
                        console.log("Error", err)
                        throw (err);
                    }
                   resolve(results);
                });
            }
            else {
                throw ("Try to query but database is not connected");
            }
        });



    }





}

export default DatabaseManager;