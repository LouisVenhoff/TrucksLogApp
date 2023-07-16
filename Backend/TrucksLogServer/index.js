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
fastify.post("/api/v1/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
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
                console.log(userId);
                res.code(200).send("\"userId\":\"".concat(userId, "\""));
                return [2 /*return*/];
        }
    });
}); });
//TODO: Get all Tours of an UserId
fastify.post("/api/v1/GetTours", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, pwdHash, payloadJSON, passValid, tours;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = parseInt(req.body.userId);
                pwdHash = req.body.pwdHash;
                payloadJSON = req.body.payload;
                return [4 /*yield*/, dbManager.validateRequest({ userId: userId, pwdHash: pwdHash })];
            case 1:
                passValid = _a.sent();
                if (!passValid) //Anfrage wurde nicht vom einem eingeloggten Nutzer erstellt
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
var startServer = function (conf) {
    dbManager = new databaseManager_1.default(conf, true);
    fastify.listen({ port: conf.port }, function (err, addr) {
        if (err) {
            throw (err);
        }
        console.log("Listening on port: " + 3000);
    });
};
