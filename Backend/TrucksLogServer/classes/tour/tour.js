"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcState = exports.TourState = exports.Game = void 0;
var Game;
(function (Game) {
    Game[Game["ETS"] = 0] = "ETS";
    Game[Game["ATS"] = 1] = "ATS";
    Game[Game["UNDEFINED"] = 2] = "UNDEFINED";
})(Game || (exports.Game = Game = {}));
var TourState;
(function (TourState) {
    TourState[TourState["AUF_FAHRT"] = 0] = "AUF_FAHRT";
    TourState[TourState["COMPLETED"] = 1] = "COMPLETED";
    TourState[TourState["REJECTED"] = 2] = "REJECTED";
    TourState[TourState["CANCELLED"] = 3] = "CANCELLED";
    TourState[TourState["OLD"] = 4] = "OLD";
    TourState[TourState["IN_CHECK"] = 5] = "IN_CHECK";
    TourState[TourState["BILLING"] = 6] = "BILLING";
    TourState[TourState["BILLED"] = 7] = "BILLED";
    TourState[TourState["UNDEFINED"] = 8] = "UNDEFINED";
})(TourState || (exports.TourState = TourState = {}));
var CalcState;
(function (CalcState) {
    CalcState[CalcState["UNDEFINED"] = 0] = "UNDEFINED";
    CalcState[CalcState["TOUR_OK"] = 1] = "TOUR_OK";
    CalcState[CalcState["TOUR_STATE_ERROR"] = 2] = "TOUR_STATE_ERROR";
    CalcState[CalcState["DISTANCE_INCORRECT"] = 3] = "DISTANCE_INCORRECT";
    CalcState[CalcState["VS_TOUR_NOT_NULL"] = 4] = "VS_TOUR_NOT_NULL";
    CalcState[CalcState["CE_TOUR_NOT_NULL"] = 5] = "CE_TOUR_NOT_NULL";
    CalcState[CalcState["NO_SALARY_TOUR_TYPE"] = 6] = "NO_SALARY_TOUR_TYPE";
    CalcState[CalcState["KILOMETER_PRICE_ERROR"] = 7] = "KILOMETER_PRICE_ERROR";
    CalcState[CalcState["END_TIMESTAMP_IS_NULL"] = 8] = "END_TIMESTAMP_IS_NULL";
})(CalcState || (exports.CalcState = CalcState = {}));
var Tour = /** @class */ (function () {
    function Tour(dataset) {
        this.game = Game.UNDEFINED; //
        this.nickname = ""; //
        this.company = "";
        this.day = 0;
        this.month = 0;
        this.year = 0;
        this.kw = 0;
        this.tourId = 0;
        this.startPos = "";
        this.startCompany = "";
        this.targetPos = "";
        this.targetCompany = "";
        this.weight = "";
        this.charge = "";
        this.income = 0;
        this.kmPrice = 0;
        this.fullDistance = 0;
        this.restDistance = 0;
        this.traveledDistance = 0;
        this.startTime = "";
        this.endTime = "";
        this.freightDamage = 0;
        this.tankVolume = 0;
        this.startFuel = 0;
        this.endFuel = 0;
        this.fuelConsumption = 0;
        this.truckODOStart = 0;
        this.truckODOEnd = 0;
        this.truckDistance = 0;
        this.maxSpeed = 0;
        this.state = TourState.UNDEFINED;
        this.billDate = "";
        this.notes = "";
        this.ceTour = 0;
        this.vsTour = 0;
        this.resolveData(dataset);
    }
    Object.defineProperty(Tour.prototype, "tourValid", {
        get: function () {
            if (this.checkData() == CalcState.TOUR_OK) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tour.prototype, "calcState", {
        get: function () {
            return this.checkData();
        },
        enumerable: false,
        configurable: true
    });
    Tour.prototype.checkData = function () {
        var state = CalcState.TOUR_OK;
        //Status
        if (this.state !== TourState.COMPLETED) {
            state = CalcState.TOUR_STATE_ERROR;
        }
        //Gefahrene Kilometer
        if (this.traveledDistance < (this.fullDistance / 2) || this.traveledDistance > (this.fullDistance * 2)) {
            state = CalcState.DISTANCE_INCORRECT;
        }
        //VS VC TOUR
        if (this.vsTour !== 0) {
            state = CalcState.VS_TOUR_NOT_NULL;
        }
        if (this.ceTour !== 0) {
            state = CalcState.CE_TOUR_NOT_NULL;
        }
        //Gesamt Kilometer zwische 7999 und 1
        if (this.fullDistance > 8000 || this.fullDistance < 1) {
            state = CalcState.DISTANCE_INCORRECT;
        }
        //Einkommen nicht gleich 600
        if (this.income === 600) {
            state = CalcState.NO_SALARY_TOUR_TYPE;
        }
        //Kilometerpreis
        if (this.game === Game.ETS) {
            if (this.kmPrice > 180) {
                state = CalcState.KILOMETER_PRICE_ERROR;
            }
        }
        if (this.game === Game.ATS) {
            if (this.kmPrice > 270) {
                state = CalcState.KILOMETER_PRICE_ERROR;
            }
        }
        //EndTimestamp
        if (this.endTime === "") {
            state = CalcState.END_TIMESTAMP_IS_NULL;
        }
        return state;
    };
    Tour.prototype.resolveData = function (dataset) {
        this.game = this.resolveGame(dataset.spiel);
        this.state = this.resolveState(dataset.status);
        this.nickname = dataset.nickname;
        this.company = dataset.in_spedition;
        this.day = dataset.tag;
        this.month = dataset.monat;
        this.year = dataset.jahr;
        this.kw = dataset.kw;
        this.tourId = dataset.id;
        this.startPos = dataset.startort;
        this.startCompany = dataset.startfirma;
        this.targetPos = dataset.zielort;
        this.targetCompany = dataset.zielfirma;
        this.weight = dataset.gewicht;
        this.charge = dataset.ladung;
        this.income = dataset.einkommen;
        this.kmPrice = dataset.kilometerpreis;
        this.fullDistance = dataset.gesamt_km;
        this.restDistance = dataset.rest_km;
        this.traveledDistance = dataset.gef_km;
        this.startTime = dataset.start_datetime;
        this.endTime = dataset.end_datetime;
        this.freightDamage = dataset.frachtschaden;
        this.tankVolume = dataset.lkw_tankvolume;
        this.startFuel = dataset.start_fuel;
        this.endFuel = dataset.abgabe_fuel;
        this.fuelConsumption = this.startFuel - this.endFuel;
        this.truckODOStart = dataset.odometer_start;
        this.truckODOEnd = dataset.odometer_end;
        this.truckDistance = this.truckODOEnd - this.truckODOStart;
        this.maxSpeed = dataset.max_speed;
        this.billDate = dataset.in_abrechnung;
        this.notes = dataset.admin_notizen;
        this.ceTour = dataset.CE_TOUR;
        this.vsTour = dataset.VS_TOUR;
    };
    Tour.prototype.resolveGame = function (gameName) {
        if (gameName == "Ets2") {
            return (Game.ETS);
        }
        else {
            return (Game.ATS);
        }
    };
    Tour.prototype.resolveState = function (stateStr) {
        switch (stateStr) {
            case "Auf Fahrt":
                return (TourState.AUF_FAHRT);
                break;
            case "Abgeschlossen":
                return (TourState.COMPLETED);
                break;
            case "Abgeleht":
                return (TourState.REJECTED);
                break;
            case "Abgebrochen":
                return (TourState.CANCELLED);
                break;
            case "Veraltet":
                return (TourState.OLD);
                break;
            case "In Prüfung":
                return (TourState.IN_CHECK);
                break;
            case "In Abrechnung":
                return (TourState.BILLING);
                break;
            case "Abgerechnet":
                return (TourState.BILLED);
                break;
            default:
                return (TourState.REJECTED);
                break;
        }
    };
    return Tour;
}());
exports.default = Tour;
