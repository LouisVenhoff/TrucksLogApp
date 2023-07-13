"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var DatabaseManager = /** @class */ (function () {
    function DatabaseManager(databaseConfig, autoConnect) {
        var _this = this;
        this.connected = false;
        this.hostName = databaseConfig.dbHostname;
        this.userName = databaseConfig.dbUsername;
        this.password = databaseConfig.dbPassword;
        this.databaseName = databaseConfig.dbName;
        this.dbConnection = null;
        if (autoConnect) {
            (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            }); }); });
        }
    }
    DatabaseManager.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.connected) {
                    this.dbConnection = mysql.createConnection({
                        host: this.hostName,
                        user: this.userName,
                        password: this.password,
                        database: this.databaseName
                    });
                }
                this.dbConnection.connect(function (err) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err) {
                                    console.log("Database connection error occured!");
                                    console.log(err.stack);
                                    throw (err);
                                }
                                this.connected = true;
                                console.log("Connected to ".concat(this.databaseName));
                                return [4 /*yield*/, this.processLogin("$2y$15$cIPJpSiW8bASzQWZKWPtkOpT06EaRvdvc.Mx4RadicwQ891gIbEwi")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    DatabaseManager.prototype.processLogin = function (pwdHash) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseResult, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runQuery("SELECT id FROM user WHERE passwort = \"".concat(pwdHash, "\""))];
                    case 1:
                        databaseResult = _a.sent();
                        userId = -1;
                        if (databaseResult.length > 0) {
                            userId = parseInt(databaseResult[0].id);
                        }
                        console.log(userId);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(userId);
                            })];
                }
            });
        });
    };
    DatabaseManager.prototype.runQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.connected) {
                    this.dbConnection.query(query, function (err, results, fields) {
                        if (err) {
                            throw (err);
                        }
                        return new Promise(function (resolve, reject) {
                            resolve(results);
                        });
                    });
                }
                else {
                    throw ("Try to query but database is not connected");
                }
                return [2 /*return*/];
            });
        });
    };
    return DatabaseManager;
}());
exports.default = DatabaseManager;
