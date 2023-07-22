const bcrypt = require("bcrypt");

class CryptoHelper
{
    public static async  checkPassWd(password:string, hash:string):Promise<boolean>
    {
        let parsedCryptoPass:string = hash.replace("$2y$", "$2a$");

        let passOk = await bcrypt.compare(password, parsedCryptoPass);

        return new Promise((resolve, reject) => {
            resolve(passOk);
        });
    }
}

export default CryptoHelper;