import axios from "axios";
import Toaster from "../toaster/toaster";
import { AlertType } from "../../components/alertComponent/alertComponent";

type UserObj = {
  id: number;
  username: string;
  clientKey: string;
  avatar: string;
};

class ApiController {
  private hostname: string;
  private port: string;
  private queryPattern: string;

  constructor(hostname: string, port: number) {
    this.hostname = hostname;
    this.port = port.toString();
    this.queryPattern = `http://${this.hostname}:${this.port}`;
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
        };

        // if (result.data.userId === -1) {
        //   resolve(tempUser);
        //   return;
        // }
        tempUser.id = result.data.userId;
        tempUser.clientKey = result.data.clientKey;
        tempUser.avatar = result.data.avatar;
        resolve(tempUser);
      } catch 
      {
        reject();
      }
    });
  }

  private async sendPost(uri: string, body: any): Promise<any> {
    
    return new Promise(async (resolve, reject) => {
      try
      {
        resolve(await axios.post(`${this.queryPattern}${uri}`, body));
      }
      catch
      {
        Toaster.show("Server nicht erreichbar", AlertType.ERROR, 1500);
      }
      
    });
  }
}

export default ApiController;
