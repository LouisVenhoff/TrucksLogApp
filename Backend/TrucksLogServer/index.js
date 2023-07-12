"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configReader_1 = require("../classes/configReader");
var fastify = require("fastify")({
    logger: false
});
var confReader = new configReader_1.default("test.json");
fastify.get("/", function (req, res) {
    res.send({ Status: "OK" });
});
fastify.listen({ port: 3000 }, function (err, addr) {
    if (err) {
        throw (err);
    }
    console.log("Listening on port: " + 3000);
});
