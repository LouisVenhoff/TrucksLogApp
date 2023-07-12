"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var defaultConfig = {
    port: 3000,
    dbName: "",
    dbHostname: "",
    dbUsername: "",
    dbPassword: ""
};
var ConfigReader = /** @class */ (function () {
    function ConfigReader(path) {
        this.path = path;
        this.initReader();
    }
    ConfigReader.prototype.initReader = function () {
        //TODO: Check if file is there, when not create File
        var _this = this;
        fs.open(this.path, "r", function (err, fd) {
            if (err) {
                _this.createDefaultConfig();
            }
            else {
                console.log("File created!");
            }
            fs.close(fd);
        });
    };
    ConfigReader.prototype.createDefaultConfig = function () {
        fs.appendFile(this.path, JSON.stringify(defaultConfig), function (err) {
            if (err) {
                throw (err);
            }
            console.log("Created a new Config file! Pleas edit it and add your config!");
        });
    };
    return ConfigReader;
}());
exports.default = ConfigReader;
