import ConfigReader, { Config } from "./classes/configReader/configReader";
import DatabaseManager from "./classes/databaseManager/databaseManager";
import Tour from "./classes/tour/tour";

const fastify = require("fastify")({
    logger: false
})

const confReader: ConfigReader = new ConfigReader("config.json", (conf: Config) => { startServer(conf) });
var dbManager: DatabaseManager;

fastify.get("/", (req, res) => {
    res.send({ Status: "OK" })
})


fastify.post("/api/v1/login", async (req, res) => {

    if (dbManager == undefined) {
        res.code(500).send();
        return;
    }

    let userId: number = await dbManager.processLogin(req.body.mail, req.body.passwd);
    let clientKey:string = "";
    
    if(userId !== -1)
    {
        clientKey = await dbManager.getClientKey(userId);
    }

    console.log(userId);

    res.code(200).send({userId:userId, clientKey:clientKey});

});

//TODO: Get all Tours of an UserId

fastify.post("/api/v1/getTours", async (req, res) => {
    let userId:number = parseInt(req.body.userId);
    let clientKey:string = req.body.clientKey;

    let userValid:boolean = await dbManager.validateRequest({userId:userId, clientKey:clientKey});
    
    console.log(userValid);

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

fastify.post("/api/v1/getTour", async (req, res) => {
    let tourId:number = parseInt(req.body.tourId);
    let userId:number = parseInt(req.body.userId);
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


fastify.post("/api/v1/calcTour", async (req, res) => {
    //TODO: Check and Calculate Tour

    let tourId:number = parseInt(req.body.tourId);
    let userId:number = req.body.userId;
    let clientKey:string = req.body.clientKey;

    let passValid:boolean = await dbManager.validateRequest({userId:userId, clientKey:clientKey});

    if(!passValid){
        res.code(403).send();
        return;
    }

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


const startServer = (conf: Config) => {

    dbManager = new DatabaseManager(conf, true);

    fastify.listen({ port: conf.port }, (err: any, addr: any) => {

        if (err) {
            throw (err);
        }
        console.log("Listening on port: " + 3000);

    });
}






