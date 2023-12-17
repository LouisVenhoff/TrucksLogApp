import axios from "axios";
import Toaster from "../toaster/toaster";
import { AlertType } from "../../components/alertComponent/alertComponent";
import Tour from "../tour/tour";


export type UserObj = {
  id: number;
  username: string;
  clientKey: string;
  avatar: string;
  billPermission:boolean
};

export type CompanyObj = {
  companyId:number;
  name:string;
  avatar:string;
}


class ApiController {
  private hostname: string;
  private port: string;
  private queryPattern: string;
  private errorCallback: () => void;

 

  constructor(hostname: string, port: number, errorCallback:() => void) {
    this.hostname = hostname;
    this.port = port.toString();
    this.errorCallback = errorCallback;
    //this.queryPattern = `https://${this.hostname}:${this.port}`;
    this.queryPattern = `http://${this.hostname}:${this.port}`;
  }

  public async LoadTours(id: number, clientKey: string): Promise<Tour[]> {

    let result: any = await this.sendPost("/api/v1/getTours", {
      userId: id,
      clientKey: clientKey,
    })

    let tourArr: Tour[] = this.createTourArr(result.data);

    return new Promise((resolve, reject) => {

      resolve(tourArr);

    });


  }

 
  public async LoadSingleTour(userId:number, tourId:number, clientKey:string):Promise<Tour>
  {
      let result:any = await this.sendPost("/api/v1/getTour", {
        userId:userId,
        clientKey:clientKey,
        tourId:tourId
      });

      let currentTour:Tour;

      try
      {
        currentTour = result.data;
      }
      catch
      {
        throw("Technical Error! Server data in wrong format!");
      }
      
      //Hotfix: Provide that consumed Fuel Level is not negative
      if(currentTour.fuelConsumption < 0)
      {
        currentTour.fuelConsumption *= -1;
      }
      
      return new Promise((resolve, reject) => {
          resolve(currentTour);
      });
  }

  public async LoadCompanyTours(id:number, clientKey:string, companyId:number):Promise<Tour[]>
  {
      let result = await this.sendPost("/api/v1/getCompanyTours", {
        userId: id,
        clientKey: clientKey,
        companyId: companyId,
      });

      let tourArr:Tour[] = this.createTourArr(result.data);

      return new Promise((resolve, reject) => {
        resolve(tourArr);
      });
  }

  public async LoadCompanyData(id:number, clientKey:string):Promise<CompanyObj>
  {
    let result = await this.sendPost("/api/v1/getCompany",{
      userId: id,
      clientKey: clientKey
    });

    let company:CompanyObj = {
      companyId: result.data.companyId,
      name: result.data.name,
      avatar: result.data.avatar,
    }

    return new Promise((resolve, reject) => {
      resolve(company);
    });
  }


  public async Login(email: string, password: string): Promise<UserObj> {
    let result: any = await this.sendPost("/api/v1/login", {
      mail: email,
      passwd: password,
    });

    return new Promise((resolve, reject) => {
      try {
        let tempUser: UserObj = {
          id: -1,
          username: "",
          clientKey: "",
          avatar: "",
          billPermission: false
        };
        tempUser.id = result.data.userId;
        tempUser.username = result.data.username;
        tempUser.clientKey = result.data.clientKey;
        tempUser.avatar = result.data.avatar;
        tempUser.billPermission = result.data.billPermission;
        resolve(tempUser);
      } catch
      {
        reject();
      }
    });
  }

  public calcTour(userId: number, tourId: number, companyId:number, clientKey: string): Promise<number> {
  
    return new Promise(async (resolve, reject) => {
      this.sendPost("/api/v1/calcTour", {
        userId: userId,
        clientKey: clientKey,
        tourId: tourId,
        companyId: companyId,
      })
      .then((res:any) => {
          resolve(res.data.calcResult)
      });
    });


  }

  private async sendPost(uri: string, body: any): Promise<any> {

    return new Promise(async (resolve, reject) => {
      try {
        resolve(await axios.post(`${this.queryPattern}${uri}`, body));
      }
      catch(err:any)
      {
        console.log(err);
        this.errorCallback();
        Toaster.show("Server nicht erreichbar", AlertType.ERROR, 1500);
      }

    });
  }

  private createTourArr(input: any[]): Tour[] {
    let output: Tour[] = [];

    for (let i = 0; i < input.length; i++) {
      output.push(input[i] as Tour);
    }
    return output;

  }


}

export default ApiController;
