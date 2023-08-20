import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Config } from "../configReader/configReader";
import Tour from "../tour/tour";
import bcrypt from "bcrypt";
import CryptoHelper from "../cryptoHelper/cryptoHelper";
const mysql = require("mysql");


export type ValidationObj = {
    userId: number,
    clientKey: string
}

type UserInfoObj = {
    username:string;
    clientKey:string,
    avatar:string
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

        this.dbConnection.connect(async (err:any) => {

            if (err) {
                console.log("Database connection error occured!");
                console.log(err.stack);
                throw (err);
            }

            this.connected = true;

            console.log(`Connected to ${this.databaseName}`);


        });

    }

    public async processLogin(mail: string, password: string): Promise<number> {

            //TODO: Load encrypted Password from DB an verify
            //Return: UserId

            let userInfo:any = await this.runQuery("SELECT passwort, id FROM user WHERE email = ?", mail);
         
            

            return new Promise(async (resolve, reject) => {
                if(userInfo.length === 0 || userInfo === undefined)
                {
                    resolve(-1);
                    return;
                }
                
                let passOk:boolean = await CryptoHelper.checkPassWd(password, userInfo[0].passwort);

                if(!passOk)
                {
                    resolve(-1);
                }
                else
                {
                    resolve(userInfo[0].id);
                }

            });

    }

    public async getAvatar(userId:number):Promise<string>
    {
        let avatarLink:any = await this.runQuery("SELECT profilbild FROM user WHERE id = ?", userId);

        return new Promise((resolve, reject) => {
            if(avatarLink.length > 0)
            {
                resolve(avatarLink[0].profilbild);
            }
            else
            {
                resolve("");
            }
        });
    }

    public async validateRequest(data: ValidationObj): Promise<boolean> {

        
        let userClientKey:string = await this.getClientKey(data.userId);
        
        return new Promise((resolve, reject) => {
            try {
                if (userClientKey === data.clientKey) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
            catch(e:any)
            {
                resolve(false);
            }

        });


    }




    public async loadTours(userId: number): Promise<Tour[]> {
        //TODO: Laded alle benötigten Informationen aus einer Tour und Speichere diese in eine Tour Objekt

        let userClientKey:string = await this.getClientKey(userId);

        let userTours: any = await this.runQuery("SELECT * FROM c_tourtable WHERE client_key = ?", userClientKey);

        return new Promise((resolve, reject) => {

            if (userTours.length === 0) {
                resolve([]);
            }

            let tourArr: Tour[] = [];

            for (let i = 0; i < userTours.length; i++) {
                tourArr.push(new Tour(userTours[i]));
            }

            resolve(tourArr);
        });

    }

    public async loadTourById(tourId: number): Promise<Tour> {
        let resolvedTour: any = await this.runQuery("SELECT * FROM c_tourtable WHERE id = ?", tourId);

        let outTour = new Tour(resolvedTour[0]);

        return new Promise((resolve, reject) => {
            resolve(outTour);
        });
    }


    public async calculateTour(tourId: number) {
        await this.runQuery(`UPDATE c_tourtable SET status="In Abrechnung" WHERE id=?`, tourId);
    }

    public async checkUserTour(userId: number, tourId: number): Promise<boolean> {
        let tourColumn: any = await this.runQuery(`SELECT c_tourtable.id AS TourId, user.id AS UserId FROM c_tourtable 
        JOIN user on user.client_key = c_tourtable.client_key
        WHERE user.id = ?
        AND c_tourtable.id = ?;`, userId, tourId);


        return new Promise((resolve, reject) => {
            if (tourColumn.length === 0) {
                resolve(false);
                return;
            }
            resolve(true);
        });

    }

    public async getClientKey(userId: number): Promise<string> {
        let clientKey:any = await this.runQuery("SELECT client_key FROM user WHERE id = ?", userId);

        return new Promise((resolve, reject) => {
            resolve(clientKey[0].client_key);
        });
    }

    public async getUserInfo(userId:number):Promise<UserInfoObj>
    {
        let userInfoObj = await this.runQuery("SELECT client_key, nickname,  profilbild FROM user WHERE id = ?", userId);
    
        return new Promise((resolve, reject) => {
            resolve({username:userInfoObj[0].nickname, clientKey:userInfoObj[0].client_key, avatar:userInfoObj[0].profilbild});
        });
    
    }


    private async runQuery(query: string, ...args:any): Promise<any> {


        return new Promise((resolve, reject) => {
            if (this.connected) {
                this.dbConnection.query(query, args, (err: any, results: any, fields: any) => {
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