export enum Game {
    ETS,
    ATS,
    UNDEFINED
}

export enum TourState {
    AUF_FAHRT,
    COMPLETED,
    REJECTED,
    CANCELLED,
    OLD,
    IN_CHECK,
    BILLING,
    BILLED,
    UNDEFINED
}

export enum CalcState {
    TOUR_OK,
    TOUR_STATE_ERROR,
    DISTANCE_INCORRECT,
    VS_TOUR_NOT_NULL,
    CE_TOUR_NOT_NULL,
    NO_SALARY_TOUR_TYPE,
    KILOMETER_PRICE_ERROR,
    END_TIMESTAMP_IS_NULL
}



class Tour {

    public game: Game = Game.UNDEFINED; // = ""
    public nickname: string = ""; //
    public company: string = "";


    public day: number = 0;
    public month: number = 0;
    public year: number = 0;
    public kw: number = 0;

    public tourId: number = 0;
    public startPos: string = "";
    public startCompany: string = "";
    public targetPos: string = "";
    public targetCompany: string = "";

    public weight: string = "";
    public charge: string = "";
    public income: number = 0;
    public kmPrice: number = 0;

    public fullDistance: number = 0;
    public restDistance: number = 0;
    public traveledDistance: number = 0;

    public startTime: string = "";
    public endTime: string = "";

    public freightDamage: number = 0;

    public tankVolume: number = 0;
    public startFuel: number = 0;
    public endFuel: number = 0;
    public fuelConsumption: number = 0;

    public truckODOStart: number = 0;
    public truckODOEnd: number = 0;
    public truckDistance: number = 0;

    public maxSpeed: number = 0;

    public state: TourState = TourState.UNDEFINED;
    public billDate: string = "";

    public notes: string = "";

    public ceTour: number = 0;
    public vsTour: number = 0;


    constructor(dataset: any) {
        this.resolveData(dataset);
    }

    public get tourValid(): boolean {
        if (this.checkData() == CalcState.TOUR_OK) {
            return true;
        }
        else {
            return false;
        }
    }

    public get calcState():CalcState
    {
            return this.checkData();
    }

    private checkData():CalcState {
        let state: CalcState = CalcState.TOUR_OK;

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
    }


    private resolveData(dataset: any) {

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
    }

    private resolveGame(gameName: string): Game {
        if (gameName == "Ets2") {
            return (Game.ETS);
        }
        else {
            return (Game.ATS);
        }

    }

    private resolveState(stateStr: string): TourState {
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
    }








}

export default Tour;