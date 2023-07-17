"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourState = exports.Game = void 0;
var Game;
(function (Game) {
    Game[Game["ETS"] = 0] = "ETS";
    Game[Game["ATS"] = 1] = "ATS";
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
})(TourState || (exports.TourState = TourState = {}));
var Tour = /** @class */ (function () {
    function Tour(dataset) {
        this.resolveData(dataset);
    }
    Object.defineProperty(Tour.prototype, "tourValid", {
        get: function () {
            return (this.checkData());
        },
        enumerable: false,
        configurable: true
    });
    Tour.prototype.checkData = function () {
        var dataOK = true;
        //Status
        if (this.state !== TourState.COMPLETED) {
            dataOK = false;
        }
        //Gefahrene Kilometer
        if (this.traveledDistance < (this.fullDistance / 2) || this.traveledDistance > (this.fullDistance * 2)) {
            dataOK = false;
        }
        //VS VC TOUR
        if (this.vsTour !== 0) {
            dataOK = false;
        }
        if (this.ceTour !== 0) {
            dataOK = false;
        }
        //Gesamt Kilometer zwische 7999 und 1
        if (this.fullDistance > 8000 || this.fullDistance < 1) {
            dataOK = false;
        }
        //Einkommen nicht gleich 600
        if (this.income === 600) {
            dataOK = false;
        }
        //Kilometerpreis
        if (this.game === Game.ETS) {
            if (this.kmPrice > 180) {
                dataOK = false;
            }
        }
        if (this.game === Game.ATS) {
            if (this.kmPrice > 270) {
                dataOK = false;
            }
        }
        //EndTimestamp
        if (this.endTime === "") {
            dataOK = false;
        }
        return dataOK;
        //TODO: Check Km
    };
    Tour.prototype.resolveData = function (dataset) {
        this.game = this.resolveGame(dataset.spiel);
        this.state = this.resolveState(dataset.status);
        this.nickname = dataset.nickname;
        this.company = dataset.in_spedition;
        this.day = dataset.tag;
        this.month = dataset.monat;
        this.year = dataset.year;
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
