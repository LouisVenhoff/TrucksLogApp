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
var tour_1 = require("../tour/tour");
var cryptoHelper_1 = require("../cryptoHelper/cryptoHelper");
var mysql = require("mysql");
var bcrypt = require("bcrypt");
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
                        if (err) {
                            console.log("Database connection error occured!");
                            console.log(err.stack);
                            throw (err);
                        }
                        this.connected = true;
                        console.log("Connected to ".concat(this.databaseName));
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    DatabaseManager.prototype.processLogin = function (mail, password) {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runQuery("SELECT passwort, id FROM user WHERE email = ?", mail)];
                    case 1:
                        userInfo = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var passOk;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (userInfo.length === 0 || userInfo === undefined) {
                                                resolve(-1);
                                                return [2 /*return*/];
                                            }
                                            return [4 /*yield*/, cryptoHelper_1.default.checkPassWd(password, userInfo[0].passwort)];
                                        case 1:
                                            passOk = _a.sent();
                                            if (!passOk) {
                                                resolve(-1);
                                            }
                                            else {
                                                resolve(userInfo[0].id);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                }
            });
        });
    };
    DatabaseManager.prototype.getAvatar = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var avatarLink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runQuery("SELECT profilbild FROM user WHERE id = ?", userId)];
                    case 1:
                        avatarLink = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                if (avatarLink.length > 0) {
                                    resolve(avatarLink[0].profilbild);
                                }
                                else {
                                    resolve("");
                                }
                            })];
                }
            });
        });
    };
    DatabaseManager.prototype.validateRequest = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var userClientKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClientKey(data.userId)];
                    case 1:
                        userClientKey = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                try {
                                    if (userClientKey === data.clientKey) {
                                        resolve(true);
                                    }
                                    else {
                                        resolve(false);
                                    }
                                }
                                catch (e) {
                                    resolve(false);
                                }
                            })];
                }
            });
        });
    };
    DatabaseManager.prototype.loadTours = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userClientKey, userTours;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClientKey(userId)];
                    case 1:
                        userClientKey = _a.sent();
                        return [4 /*yield*/, this.runQuery("SELECT * FROM c_tourtable WHERE client_key = ?", userClientKey)];
                    case 2:
                        userTours = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var tourArr, i, tempTour, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (userTours.length === 0) {
                                                resolve([]);
                                            }
                                            tourArr = [];
                                            i = 0;
                                            _b.label = 1;
                                        case 1:
                                            if (!(i < userTours.length)) return [3 /*break*/, 5];
                                            tempTour = new tour_1.default(userTours[i]);
                                            if (!(tempTour.tourId !== null)) return [3 /*break*/, 3];
                                            _a = tempTour;
                                            return [4 /*yield*/, this.loadRefuelAmount(tempTour.tourId)];
                                        case 2:
                                            _a.refueled = _b.sent();
                                            _b.label = 3;
                                        case 3:
                                            tourArr.push(tempTour);
                                            _b.label = 4;
                                        case 4:
                                            i++;
                                            return [3 /*break*/, 1];
                                        case 5:
                                            resolve(tourArr);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                }
            });
        });
    };
    DatabaseManager.prototype.loadTourById = function (tourId) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedTour, outTour, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.runQuery("SELECT * FROM c_tourtable WHERE id = ?", tourId)];
                    case 1:
                        resolvedTour = _b.sent();
                        outTour = new tour_1.default(resolvedTour[0]);
                        _a = outTour;
                        return [4 /*yield*/, this.loadRefuelAmount(tourId)];
                    case 2:
                        _a.refueled = _b.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(outTour);
                            })];
                }
            });
        });
    };
    DatabaseManager.prototype.calculateTour = function (tourId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runQuery("UPDATE c_tourtable SET status=\"In Abrechnung\" WHERE id=?", tourId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseManager.prototype.checkUserTour = function (userId, tourId) {
        return __awaiter(this, void 0, void 0, function () {
            var tourColumn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runQuery("SELECT c_tourtable.id AS TourId, user.id AS UserId FROM c_tourtable \n        JOIN user on user.client_key = c_tourtable.client_key\n        WHERE user.id = ?\n        AND c_tourtable.id = ?;", userId, tourId)];
                    case 1:
                        tourColumn = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                if (tourColumn.length === 0) {
                                    resolve(false);
                                    return;
                                }
                                resolve(true);
                            })];
                }
            });
        });
    };
    DatabaseManager.prototype.getClientKey = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var clientKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runQuery("SELECT client_key FROM user WHERE id = ?", userId)];
                    case 1:
                        clientKey = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(clientKey[0].client_key);
                            })];
                }
            });
        });
    };
    DatabaseManager.prototype.getUserInfo = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userInfoObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runQuery("SELECT client_key, user.nickname,  profilbild, fb.fahrer_abrechnen AS billPermission FROM user JOIN fahrer__berechtigungen fb ON email = fb.fahrer_id WHERE user.id = ?", userId)];
                    case 1:
                        userInfoObj = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var tempBillPermission = userInfoObj[0].billPermission === 1 ? true : false;
                                resolve({ username: userInfoObj[0].nickname, clientKey: userInfoObj[0].client_key, avatar: userInfoObj[0].profilbild, billPermission: tempBillPermission });
                            })];
                }
            });
        });
    };
    DatabaseManager.prototype.loadRefuelAmount = function (tourId) {
        return __awaiter(this, void 0, void 0, function () {
            var fuelDbData, refueledAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runQuery("SELECT liter FROM c_tourtable a  LEFT JOIN c_tanken b ON a.tour_id = b.tour_id WHERE a.id = ?;", tourId)];
                    case 1:
                        fuelDbData = _a.sent();
                        refueledAmount = fuelDbData[0].liter;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                if (refueledAmount !== null) {
                                    resolve(refueledAmount);
                                }
                                else {
                                    resolve(0);
                                }
                            })];
                }
            });
        });
    };
    DatabaseManager.prototype.runQuery = function (query) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (_this.connected) {
                            _this.dbConnection.query(query, args, function (err, results, fields) {
                                if (err) {
                                    console.log("Error", err);
                                    throw (err);
                                }
                                resolve(results);
                            });
                        }
                        else {
                            throw ("Try to query but database is not connected");
                        }
                    })];
            });
        });
    };
    return DatabaseManager;
}());
exports.default = DatabaseManager;
