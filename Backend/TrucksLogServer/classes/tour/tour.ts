export enum Game
{
    ETS,
    ATS
}

export enum TourState{
    AUF_FAHRT,
    COMPLETED,
    REJECTED,
    CANCELLED,
    OLD, 
    IN_CHECK,
    BILLING,
    BILLED
}



class Tour
{

    public game:Game; //
    public nickname:string; //
    public company:string;
    

    public day:number;
    public month:number;
    public year:number;
    public kw:number;

    public tourId:number;
    public startPos:string;
    public startCompany:string;
    public targetPos:string;
    public targetCompany:string;
    
    public weight:string;
    public charge:string;
    public income:number;
    public kmPrice:number;

    public fullDistance:number;
    public restDistance:number;
    public traveledDistance:number;
    
    public startTime:string;
    public endTime:string;

    public freightDamage:number;

    public tankVolume:number;
    public startFuel:number;
    public endFuel:number;
    public fuelConsumption:number;

    public truckODOStart:number;
    public truckODOEnd:number;
    public truckDistance:number;

    public maxSpeed:number;

    public state:TourState;
    public billDate:string;

    public notes:string;

    public ceTour:number;
    public vsTour:number;


    constructor(dataset:any)
    {
        this.resolveData(dataset);
    }

    public get tourValid():boolean
    {
        return(this.checkData())
    }

    private checkData():boolean
    {
        let dataOK:boolean = true;

        //Status
        if(this.state !== TourState.COMPLETED)
        {
            dataOK = false;
        }

        //Gefahrene Kilometer
        if(this.traveledDistance < (this.fullDistance / 2) || this.traveledDistance > (this.fullDistance * 2))
        {
            dataOK = false;
        }

        //VS VC TOUR
        if(this.vsTour !== 0)
        {
            dataOK = false;
        }

        if(this.ceTour !== 0)
        {
            dataOK = false;
        }

        //Gesamt Kilometer zwische 7999 und 1
        if(this.fullDistance > 8000 || this.fullDistance < 1)
        {
            dataOK = false;
        }

        //Einkommen nicht gleich 600
        if(this.income === 600)
        {
            dataOK = false;
        }

        //Kilometerpreis
        if(this.game === Game.ETS){
            if(this.kmPrice > 180){
                dataOK = false;
            }
        }

        if(this.game === Game.ATS){
            if(this.kmPrice > 270){
                dataOK = false;
            }
        }

        //EndTimestamp
        if(this.endTime === "")
        {
            dataOK = false;
        }
        
        return dataOK;
        //TODO: Check Km

    }


    private resolveData(dataset:any)
    {
       
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

    private resolveGame(gameName:string):Game
    {
        if(gameName == "Ets2")
        {
            return(Game.ETS);
        }
        else
        {
           return(Game.ATS);
        }

    }

    private resolveState(stateStr:string):TourState
    {
        switch(stateStr)
        {
            case "Auf Fahrt":
                    return(TourState.AUF_FAHRT); 
                break;
            case "Abgeschlossen":
                    return(TourState.COMPLETED);
                break;
            case "Abgeleht":
                    return(TourState.REJECTED);
                break;
            case "Abgebrochen":
                    return(TourState.CANCELLED);
                break;
            case "Veraltet":
                    return(TourState.OLD);
                break;
            case "In Prüfung":
                    return(TourState.IN_CHECK);
                break;
            case "In Abrechnung":
                    return(TourState.BILLING);
                break;
            case "Abgerechnet":
                    return(TourState.BILLED);
                break;
            default:
                    return(TourState.REJECTED);
                break;
        }
    }








}

export default Tour;