import { getAllInstallations, getDiagnostics, getTags } from "./api";
import { log } from "./logger";
import { writeVrmDataToDisk } from "./storage-disk";
import { replaceInstallations, replaceDiagnostics, replaceTags } from './storage-ram';
import { delay } from "./utils";

export async function getAllDataFromVrm() {

    let installations = await getAllInstallations();
    replaceInstallations(installations)
    await delay(1000);

    for (let index = 0; index < installations.length; index++) {
      const inst = installations[index] as any;
      replaceDiagnostics(inst.idSite, await getDiagnostics(inst.idSite))
      await delay(100);
      replaceTags(inst.idSite, await getTags(inst.idSite))
      log('FETCH: '+(index+1)+'/'+installations.length+' completed')
      writeVrmDataToDisk();
      await delay(1000);
    }
}