"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configReader_1 = require("./classes/configReader");
var fastify = require("fastify")({
    logger: false
});
var confReader = new configReader_1.default("Config.json", function (conf) { startServer(conf); });
fastify.get("/", function (req, res) {
    res.send({ Status: "OK" });
});
var startServer = function (conf) {
    fastify.listen({ port: conf.port }, function (err, addr) {
        if (err) {
            throw (err);
        }
        console.log("Listening on port: " + 3000);
    });
};
