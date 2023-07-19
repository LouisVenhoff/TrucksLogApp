import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Config } from "../configReader/configReader";
import Tour from "../tour/tour";
const mysql = require("mysql");

export type ValidationObj = {
    userId:number,
    pwdHash:string
}

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

    public async validateRequest(data: ValidationObj):Promise<boolean>{

        let userPassword:any = await this.runQuery("SELECT passwort FROM user WHERE id = ?", data.userId);

        return new Promise((resolve, reject) => {
            try
            {
                if(userPassword[0].passwort === data.pwdHash){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            }
            catch
            {
                resolve(false);
            }
            
        });


    }

    


    public async loadTours(userId:number):Promise<Tour[]>
    {
        //TODO: Laded alle benötigten Informationen aus einer Tour und Speichere diese in eine Tour Objekt
        
        let userClientKey:any = await this.getClientKey(userId);
        
        let userTours:any = await this.runQuery("SELECT * FROM c_tourtable WHERE client_key = ?", userClientKey[0].client_key);
        
        return new Promise((resolve, reject) => {

            if(userTours.length === 0)
            {
                resolve([]);
            }

            let tourArr:Tour[] = [];

            for(let i = 0; i < userTours.length; i++){
                tourArr.push(new Tour(userTours[i]));
            }

            resolve(tourArr);
        });

    }

    public async loadTourById(tourId:number):Promise<Tour>
    {
        let resolvedTour:any = await this.runQuery("SELECT * FROM c_tourtable WHERE id = ?", tourId);

        let outTour = new Tour(resolvedTour[0]);

        return new Promise((resolve, reject) => {
            resolve(outTour);
        });
    }


    public async calculateTour(tourId:number)
    {
        await this.runQuery(`UPDATE c_tourtable SET status="In Abrechnung" WHERE id=?`, tourId);
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

    private async getClientKey(userId:number):Promise<string>
    {
        let clientKey:string = await this.runQuery("SELECT client_key FROM user WHERE id = ?", userId);
        
        return new Promise((resolve, reject) => {
            resolve(clientKey);
        });
    }





}

export default DatabaseManager;