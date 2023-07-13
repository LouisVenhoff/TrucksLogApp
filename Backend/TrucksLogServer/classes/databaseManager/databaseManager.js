"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var DatabaseManager = /** @class */ (function () {
    function DatabaseManager(databaseConfig, autoConnect) {
        this.connected = false;
        this.hostName = databaseConfig.dbHostname;
        this.userName = databaseConfig.dbUsername;
        this.password = databaseConfig.dbPassword;
        this.databaseName = databaseConfig.dbName;
        this.dbConnection = null;
        if (autoConnect) {
            this.connect();
        }
    }
    DatabaseManager.prototype.connect = function () {
        var _this = this;
        if (!this.connected) {
            this.dbConnection = mysql.createConnection({
                host: this.hostName,
                user: this.userName,
                password: this.password
            });
        }
        this.dbConnection.connect(function (err) {
            if (err) {
                console.log("Database connection error occured!");
                console.log(err.stack);
                throw (err);
            }
            _this.connected = true;
            console.log("Connected to ".concat(_this.databaseName));
        });
    };
    return DatabaseManager;
}());
exports.default = DatabaseManager;
