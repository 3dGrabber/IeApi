export function log(message:any){

    let logString:string = new Date().toLocaleString();
    logString+=' | ';
    logString+=message;
    console.log(logString);

}