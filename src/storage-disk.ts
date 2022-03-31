import fs from 'fs';
import { log } from './logger';
import { vrmDataStorage } from './main';

export function readVrmDataFromDisk(): object {
    try {
        const data = fs.readFileSync('vrmData.json', 'utf8')
        log('DISK: read file vrmData.json')
        return JSON.parse(data)
    } catch (err) {
        console.error(err)
    }
    return { vrmData:{} };
}

export function writeVrmDataToDisk(): void {
    fs.writeFile('vrmData.json', JSON.stringify(vrmDataStorage), 'utf8', function (err) {
        if (err) {
            log('DISK: error occurred writing JSON to vrmData.json');
            return console.log(err);
        }
        log('DISK: vrmData.json file saved');
    });
    return
}