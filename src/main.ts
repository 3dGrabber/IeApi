import { readVrmDataFromDisk } from "./storage-disk";
import { getAllDataFromVrm } from "./fetchData";
import { log } from "./logger";
import { startServer } from "./server";
import { vrmGetToken } from "./api";

export let vrmDataStorage:any = readVrmDataFromDisk()

startServer();

//get token, then start reading data
vrmGetToken().then(async () => {
    setTimeout(getAllDataFromVrmContinuously,0)
}).catch(error => console.log(error));

async function getAllDataFromVrmContinuously(){
    await getAllDataFromVrm();
    setTimeout(getAllDataFromVrmContinuously, 5 * 60 * 1000)
}