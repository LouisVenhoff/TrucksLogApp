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
var certReader_1 = require("./classes/certReader/certReader");
var configReader_1 = require("./classes/configReader/configReader");
var databaseManager_1 = require("./classes/databaseManager/databaseManager");
var cors_1 = require("@fastify/cors");
var auth_1 = require("./middlewares/auth");
var fs = require("fs");
var certReader = new certReader_1.default("certificates");
var softwareVersion = "2.0.0";
var fastify = require("fastify")({
    logger: false,
    // https:{
    //     key: fs.readFileSync(certReader.keyFile),
    //     cert: fs.readFileSync(certReader.certificateFile)
    // }
});
fastify.register(cors_1.default, {});
var confReader = new configReader_1.default("config.json", function (conf) { startServer(conf); });
var dbManager;
var middleWareWrapper = function (req, res, next) {
    (0, auth_1.authClientKey)(req, res, dbManager, next);
};
fastify.get("/", function (req, res) {
    res.send({ Status: "OK", version: softwareVersion });
});
fastify.post("/api/v1/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, clientKey, avatarLink, username, billPermission, usrInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (dbManager == undefined) {
                    res.code(500).send();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dbManager.processLogin(req.body.mail, req.body.passwd)];
            case 1:
                userId = _a.sent();
                clientKey = "";
                avatarLink = "";
                username = "";
                billPermission = false;
                if (!(userId !== -1)) return [3 /*break*/, 3];
                return [4 /*yield*/, dbManager.getUserInfo(userId)];
            case 2:
                usrInfo = _a.sent();
                clientKey = usrInfo.clientKey;
                avatarLink = usrInfo.avatar;
                username = usrInfo.username;
                billPermission = usrInfo.billPermission;
                _a.label = 3;
            case 3:
                res.code(200).send({ userId: userId, username: username, clientKey: clientKey, avatar: avatarLink, billPermission: billPermission });
                return [2 /*return*/];
        }
    });
}); });
//TODO: Get all Tours of an UserId
fastify.post("/api/v1/getTours", { preHandler: [middleWareWrapper] }, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, clientKey, userValid, tours;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                clientKey = req.body.clientKey;
                return [4 /*yield*/, dbManager.validateRequest({ userId: userId, clientKey: clientKey })];
            case 1:
                userValid = _a.sent();
                if (!userValid) //Anfrage wurde nicht vom einem eingeloggten Nutzer erstellt
                 {
                    res.code(403).send();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dbManager.loadTours(userId)];
            case 2:
                tours = _a.sent();
                res.code(200);
                res.send(JSON.stringify(tours));
                return [2 /*return*/];
        }
    });
}); });
fastify.post("/api/v1/getTour", { preHandler: [middleWareWrapper] }, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tourId, userId, clientKey, userValid, currentTour;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tourId = req.body.tourId;
                userId = req.body.userId;
                clientKey = req.body.clientKey;
                return [4 /*yield*/, dbManager.validateRequest({ userId: userId, clientKey: clientKey })];
            case 1:
                userValid = _a.sent();
                if (!userValid) {
                    res.code(403).send();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dbManager.loadTourById(tourId)];
            case 2:
                currentTour = _a.sent();
                res.code(200).send(currentTour);
                return [2 /*return*/];
        }
    });
}); });
fastify.post("/api/v1/calcTour", { preHandler: [middleWareWrapper] }, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, tourId, companyId, calculationPermission, currentTour;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                tourId = req.body.tourId;
                companyId = req.body.companyId;
                console.log("CompId", companyId);
                return [4 /*yield*/, dbManager.checkUserPermission(userId, companyId)];
            case 1:
                calculationPermission = _a.sent();
                if (!calculationPermission) {
                    res.code(403).send();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dbManager.loadTourById(tourId)];
            case 2:
                currentTour = _a.sent();
                if (!currentTour.tourValid) {
                    res.code(200).send({ calcResult: currentTour.calcState });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dbManager.calculateTour(currentTour.tourId)];
            case 3:
                _a.sent();
                res.code(200).send({ calcResult: currentTour.calcState });
                return [2 /*return*/];
        }
    });
}); });
//Company Information
fastify.post("/api/v1/getCompany", { preHandler: [middleWareWrapper] }, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tempClientKey, companyObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tempClientKey = req.body.clientKey;
                return [4 /*yield*/, dbManager.getCompanyByClientKey(tempClientKey)];
            case 1:
                companyObj = _a.sent();
                res.send(companyObj);
                return [2 /*return*/];
        }
    });
}); });
fastify.post("/api/v1/getCompanyTours", { preHandler: [middleWareWrapper] }, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId, companyTours;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyId = req.body.companyId;
                return [4 /*yield*/, dbManager.loadCompanyTours(companyId)];
            case 1:
                companyTours = _a.sent();
                res.send(companyTours);
                return [2 /*return*/];
        }
    });
}); });
var startServer = function (conf) {
    dbManager = new databaseManager_1.default(conf, true);
    fastify.listen({ port: conf.port, host: '0.0.0.0' }, function (err, addr) {
        if (err) {
            throw (err);
        }
        console.log("TrucksLogAPP Server Version: " + softwareVersion);
        console.log("Listening on port: " + conf.port);
    });
};
