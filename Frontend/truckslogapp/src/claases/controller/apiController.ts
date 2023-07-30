import axios from "axios";

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

        if (result.userId === -1) {
          resolve(tempUser);
          return;
        }

        tempUser.clientKey = result.clientKey;
        tempUser.avatar = result.avatar;
      } catch 
      {
        reject();
      }
    });
  }

  private async sendPost(uri: string, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      resolve(await axios.post(`${this.queryPattern}${uri}`, body));
    });
  }
}

export default ApiController;
