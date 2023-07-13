import ConfigReader, { Config } from "./classes/configReader/configReader";

const fastify = require("fastify")({
    logger:false
})

const confReader:ConfigReader = new ConfigReader("config.json", (conf:Config) => {startServer(conf)});

fastify.get("/", (req, res) => {
    res.send({Status:"OK"})
})


const startServer = (conf:Config) => {
    fastify.listen({port: conf.port}, (err:any, addr:any) => {

        if(err){
            throw(err);
        }
        console.log("Listening on port: " + 3000);
    
    });
}




