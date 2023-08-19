
const fs = require("fs");


class CertReader
{
    private folderPath:string;
    private certFolderPresent:boolean = false;

    constructor(folderPath:string)
    {
        this.folderPath = folderPath;
        this.provideFolder();
    }

    public get keyFile()
    {
        return `${this.folderPath}/server.key`;
    }

    public get certificateFile()
    {
        return `${this.folderPath}/server.crt`;
    }

    public get state()
    {
        return this.certFolderPresent;
    }

    private async  provideFolder(){
        if(fs.existsSync(this.folderPath))
        {
            this.certFolderPresent = true;
            return;
        }

        await this.createCertFolder();
    }

    private async createCertFolder()
    {
        await fs.mkdirSync(this.folderPath, (err:any) => {
            
            if(err)
            {
                throw("An Error occured while creating the certificates folder!");
            }   
        } ); 
    }


}

export default CertReader;