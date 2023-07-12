import ConfigReader from "../classes/configReader"

const fastify = require("fastify")({
    logger:false
})

const confReader:ConfigReader = new ConfigReader("test.json");

fastify.get("/", (req, res) => {
    res.send({Status:"OK"})
})




fastify.listen({port: 3000}, (err:any, addr:any) => {

    if(err){
        throw(err);
    }
    console.log("Listening on port: " + 3000);

});