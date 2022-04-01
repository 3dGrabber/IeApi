import { Maybe } from "./utils";

export type VRMDataStorage = {
    vrmData: Array<InstallationData>
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

export type Device = {
    table: string,
    idField: string,
    idGenerated: boolean,
    casts: any, //TODO what is stored here?
    idSite: string,
    instance: string,
    lastConnection: string,
    secondsAgo: string,
    isValid: string,
    idDeviceType: string,
    deviceName: string,
    productIdAsReceived: string,
    productName: string,
    customProductName: Maybe<string>,
    firmwareVersion: string,
    connection: string,
    customName: Maybe<string>,
    identifier: string,
    dataAttributes: Array<DeviceDataAttribute>,
    iconClass: string,
}

export type DeviceDataAttribute = {
    idDataAttribute: string,
    code: string,
    idDeviceType: string,
    description: string,
    dataType: string,
    sortOrder: string,
    exportType: string,
    averageFloats: string,
    unit: Maybe<string>,
    formatValueOnly: string,
    formatWithUnit: string,
    targetTable: string,
    dbusServiceType: Maybe<string>,
    dbusPath: Maybe<string>,
    deprecated: string,
    bitmask: string,
    remark: Maybe<string>,
    createdAt: Maybe<string>,
    updatedAt: Maybe<string>,
    isSetting: string,
    loggedOnEvent: string,
}

export type Diagnostic = {
    idSite: number,
    timestamp: number,
    Device: string,
    instance: number,
    idDataAttribute: number,
    description: string,
    formatWithUnit: string,
    dbusServiceType: string,
    dbusPath: string,
    code: string,
    bitmask: number,
    formattedValue: string,
    rawValue: [string,number],
    dataAttributeEnumValues: Array<{
        nameEnum: string,
        valueEnum: number
    }>,
    id: number
}

export type VrmResponse<T> = {
    success: boolean,
    records: T[]
}




