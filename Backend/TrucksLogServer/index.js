"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configReader_1 = require("./classes/configReader/configReader");
var databaseManager_1 = require("./classes/databaseManager/databaseManager");
var fastify = require("fastify")({
    logger: false
});
var confReader = new configReader_1.default("config.json", function (conf) { startServer(conf); });
var dbManager;
fastify.get("/", function (req, res) {
    res.send({ Status: "OK" });
});
var startServer = function (conf) {
    dbManager = new databaseManager_1.default(conf, true);
    fastify.listen({ port: conf.port }, function (err, addr) {
        if (err) {
            throw (err);
        }
        console.log("Listening on port: " + 3000);
    });
};
