import { vrmDataStorage } from "./main";
import { writeVrmDataToDisk } from "./storage-disk";
import { Diagnostic, InstallationData } from "./vrmTypes";

export function replaceInstallations(installations: Array<InstallationData>) {
    for (let index = 0; index < vrmDataStorage.vrmData.length; index++) {
        const oldElem = getInstallationById(installations[index].idSite);
        installations[index].diagnostics = oldElem && (oldElem as any).diagnostics;
        installations[index].tags = oldElem && (oldElem as any).tags;
    }
    vrmDataStorage.vrmData = installations;
    writeVrmDataToDisk();
}

export function replaceTags(id: number, tags: Array<string>) {
    const itemIndex = vrmDataStorage.vrmData.findIndex((item: InstallationData) => item.idSite == id);
    vrmDataStorage.vrmData[itemIndex] && (vrmDataStorage.vrmData[itemIndex].tags = tags);
}

export function replaceDiagnostics(id: number, diagnostics: any) {
    const itemIndex = vrmDataStorage.vrmData.findIndex((item: InstallationData) => item.idSite == id);
    vrmDataStorage.vrmData[itemIndex] && (vrmDataStorage.vrmData[itemIndex].diagnostics = diagnostics);
}


export function getInstallationById(id: number): InstallationData | undefined {
    return vrmDataStorage.vrmData.find((inst: any) => inst.idSite == id);
}

export function getInstallationByName(name: string): InstallationData | undefined {
    return vrmDataStorage.vrmData.find((inst: any) => inst.name == name);
}

export function GetInstallationByMachineSerial(serialNumber: string): InstallationData | undefined {
    return vrmDataStorage.vrmData.find((inst: any) => getSerialNumber(inst) == serialNumber);
}

function getSerialNumber(elem: any): string {
    if (elem && elem.diagnostics) {
        const diagElem: Diagnostic = elem.diagnostics.find((elem: any) => elem.description === 'Machine serial number');
        if (diagElem && diagElem.formattedValue) return diagElem.formattedValue;
    }
    return '';
}