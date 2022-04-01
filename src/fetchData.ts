import { getAllInstallations, getDiagnostics, getTags } from "./api";
import { log } from "./logger";
import { writeVrmDataToDisk } from "./storage-disk";
import { replaceInstallations, replaceDiagnostics, replaceTags } from './storage-ram';

export async function getAllDataFromVrm() {

    const installations = await getAllInstallations();
    if(installations.length>0) replaceInstallations(installations)

    for (let index = 0; index < installations.length; index++) {
        const inst: any = installations[index];
        replaceDiagnostics(inst.idSite, await getDiagnostics(inst.idSite))
        replaceTags(inst.idSite, await getTags(inst.idSite))
        log('FETCH: ' + (index + 1) + '/' + installations.length + ' completed')
    }

    writeVrmDataToDisk();

}