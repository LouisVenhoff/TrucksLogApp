import ConfigReader, { Config } from "./classes/configReader/configReader";
import DatabaseManager from "./classes/databaseManager/databaseManager";

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

    console.log(userId);

    res.code(200).send(`"userId":"${userId}"`);

});

//TODO: Get all Tours of an UserId

fastify.post("/api/v1/GetTours", async (req, res) => {
    let userId:number = parseInt(req.body.userId);
    let pwdHash:string = req.body.pwdHash;
    let payloadJSON:string = req.body.payload;

    let passValid:boolean = await dbManager.validateRequest({userId:userId, pwdHash:pwdHash});
    
    if(!passValid) //Anfrage wurde nicht vom einem eingeloggten Nutzer erstellt
    {
        res.code(403).send();
        return;
    }

    


    //TODO:Send full Dataset of user
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






