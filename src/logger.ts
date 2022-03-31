export function log(message: string){
    let logString = new Date().toLocaleString();
    logString += ' | ';
    logString += message;
    console.log(logString);
}