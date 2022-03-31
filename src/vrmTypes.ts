import {Maybe} from "./utils";


export type Device = any // TODO
export type Diagnostic = any // TODO

export type VrmResponse<T> = {
    success: boolean,
    records: T[]
}

export type InstallationData = {
    idSite: number,
    accessLevel: number,
    owner: boolean,
    is_admin: boolean,
    name: string,
    identifier: string,
    idUser: number,
    pvMax: number,
    timezone: string,
    phonenumber: Maybe<string>,
    notes: Maybe<string>,
    geofence: Maybe<string>,
    geofenceEnabled: boolean,
    realtimeUpdates: boolean,
    hasMains: number,
    hasGenerator: number,
    noDataAlarmTimeout: Maybe<number>,
    alarmMonitoring: number,
    invalidVRMAuthTokenUsedInLogRequest: number,
    syscreated: number,
    grafanaEnabled: number,
    shared: boolean,
    device_icon: string,
    devices: Device[],
    tags: string[],
    diagnostics: Diagnostic[]
}



