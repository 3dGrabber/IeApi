import { log } from "./logger";
import { vrmDataStorage } from "./main";
import { writeVrmDataToDisk } from "./storage-disk";

export function replaceInstallations(installations:any) {
    for (let index = 0; index < vrmDataStorage.vrmData.length; index++) {
        const oldElem = getInstallationById(installations[index].idSite);
        (installations[index] as any).diagnostics = oldElem && oldElem.diagnostics;
        (installations[index] as any).tags = oldElem && oldElem.tags;
    }
    vrmDataStorage.vrmData = installations;
    writeVrmDataToDisk();
}

export function replaceTags(id:string, tags:Array<String>) {
    let itemIndex = vrmDataStorage.vrmData.findIndex((item: { idSite: string; }) => item.idSite == id);
    vrmDataStorage.vrmData[itemIndex] && (vrmDataStorage.vrmData[itemIndex].tags = tags);
}

export function replaceDiagnostics(id:string, diagnostics:any) {
    let itemIndex = vrmDataStorage.vrmData.findIndex((item: { idSite: string; }) => item.idSite == id);
    vrmDataStorage.vrmData[itemIndex] && (vrmDataStorage.vrmData[itemIndex].diagnostics = diagnostics);
}


export function getInstallationById(id:string){
    return vrmDataStorage.vrmData.find((inst: any) => inst.idSite == id);
}

export function getInstallationByName(name:string){
    return vrmDataStorage.vrmData.find((inst: any) => inst.name == name);
}