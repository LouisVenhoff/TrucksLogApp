import DatabaseManager from "../classes/databaseManager/databaseManager";

export const authClientKey =  async (req:any, res:any, dbManager:DatabaseManager, next:() => void) => {
    let userId:number = req.body.userId;
    let clientKey:string = req.body.clientKey;
    let userValid:boolean = await dbManager.validateRequest({userId:userId, clientKey:clientKey});
    


    if(!userValid) //Anfrage wurde nicht vom einem eingeloggten Nutzer erstellt
    {
        res.code(403).send();
        return;
    }
    else
    {
        next();
    }
};