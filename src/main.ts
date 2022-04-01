import { readVrmDataFromDisk } from "./storage-disk";
import { getAllDataFromVrm } from "./fetchData";
import { startServer } from "./server";
import { vrmGetToken } from "./api";
import { VRMDataStorage } from "./vrmTypes";

export const vrmDataStorage:VRMDataStorage = readVrmDataFromDisk()

const updatePeriod = 5 * 60 * 1000; // 5 minutes

startServer();

//get token, then start reading data
vrmGetToken().then(async () => {
    setTimeout(getAllDataFromVrmContinuously,0)
}).catch(error => console.log(error));

async function getAllDataFromVrmContinuously(){
    await getAllDataFromVrm();
    setTimeout(getAllDataFromVrmContinuously, updatePeriod)
}