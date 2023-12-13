import CertReader from "./classes/certReader/certReader";
import ConfigReader, { Config } from "./classes/configReader/configReader";
import DatabaseManager from "./classes/databaseManager/databaseManager";
import Tour from "./classes/tour/tour";
import cors from "@fastify/cors"
import { authClientKey } from "./middlewares/auth";

const fs = require("fs");


const certReader: CertReader = new CertReader("certificates");

const softwareVersion:string = "1.3.1";


const fastify = require("fastify")({
    logger: false,
    https:{
        key: fs.readFileSync(certReader.keyFile),
        cert: fs.readFileSync(certReader.certificateFile)
    }
})

fastify.register(cors, {})

const confReader: ConfigReader = new ConfigReader("config.json", (conf: Config) => { startServer(conf) });

var dbManager: DatabaseManager;

const middleWareWrapper = (req:any, res:any, next:() => void) => 
{
    authClientKey(req, res, dbManager, next);
}


fastify.get("/", (req:any, res:any) => {
    res.send({ Status: "OK", version: softwareVersion })
})


fastify.post("/api/v1/login", async (req:any, res:any) => {

    if (dbManager == undefined) {
        res.code(500).send();
        return;
    }

    let userId: number = await dbManager.processLogin(req.body.mail, req.body.passwd);
    let clientKey:string = "";
    let avatarLink:string = "";
    let username:string = "";
    let billPermission:boolean = false;

    if(userId !== -1)
    {
        let usrInfo = await dbManager.getUserInfo(userId);
        
        clientKey = usrInfo.clientKey;
        avatarLink = usrInfo.avatar;
        username = usrInfo.username;
        billPermission = usrInfo.billPermission;
    }

    res.code(200).send({userId:userId,username:username ,clientKey:clientKey, avatar:avatarLink, billPermission:billPermission});

});

//TODO: Get all Tours of an UserId

fastify.post("/api/v1/getTours",{preHandler: [middleWareWrapper]}, async (req:any, res:any) => {
    let userId:number = req.body.userId;
    let clientKey:string = req.body.clientKey;
    let userValid:boolean = await dbManager.validateRequest({userId:userId, clientKey:clientKey});
    
    if(!userValid) //Anfrage wurde nicht vom einem eingeloggten Nutzer erstellt
    {
        res.code(403).send();
        return;
    }

    let tours:Tour[] = await dbManager.loadTours(userId);
    
    res.code(200);
    res.send(JSON.stringify(tours));


    //TODO:Send full Dataset of user
});



fastify.post("/api/v1/getTour",{preHandler: [middleWareWrapper]}, async (req:any, res:any) => {
    let tourId:number = req.body.tourId;
    let userId:number = req.body.userId;
    let clientKey:string = req.body.clientKey;

    let userValid:boolean = await dbManager.validateRequest({userId:userId, clientKey:clientKey});
    
    if(!userValid)
    {
        res.code(403).send();
        return;
    }

    let currentTour:Tour = await dbManager.loadTourById(tourId);

    res.code(200).send(currentTour);
})


fastify.post("/api/v1/calcTour",{preHandler: [middleWareWrapper]}, async (req:any, res:any) => {
    let userId:number = req.body.userId;
    let tourId:number = req.body.tourId;
    let userIsTourDriver:boolean = await dbManager.checkUserTour(userId, tourId);
    if(!userIsTourDriver)
    {
        res.code(403).send();
        return;
    }


    let currentTour:Tour = await dbManager.loadTourById(tourId);

    if(!currentTour.tourValid)
    {
        res.code(200).send({calcResult: currentTour.calcState});
        return;
    }

    await dbManager.calculateTour(currentTour.tourId);

    res.code(200).send({calcResult: currentTour.calcState});

});


//Company Information
fastify.post("/api/v1/getCompany",{preHandler: [middleWareWrapper]}, async (req:any, res:any) => 
{
   let tempClientKey:string = req.body.clientKey;
   let companyObj:any = await dbManager.getCompanyByClientKey(tempClientKey);

   res.send(companyObj);
});

fastify.post("/api/v1/getCompanyTours",{preHandler: [middleWareWrapper]}, async (req:any, res:any) => {

    let companyId:string = req.body.companyId;

    let companyTours:Tour[] = await dbManager.loadCompanyTours(companyId);

    res.send(companyTours);
});


const startServer = (conf: Config) => {

    dbManager = new DatabaseManager(conf, true);

    fastify.listen({ port: conf.port, host:'0.0.0.0' }, (err: any, addr: any) => {

        if (err) {
            throw (err);
        }
        console.log("TrucksLogAPP Server Version: " + softwareVersion);
        console.log("Listening on port: " + conf.port);

    });
}









