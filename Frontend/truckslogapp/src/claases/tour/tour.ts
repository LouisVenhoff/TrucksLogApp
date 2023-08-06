import TourDisplay from "../../components/TourDisplay/tourDisplay";

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

    public get TimeString():string
    {
        return `${this.day} : ${this.month}`;
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