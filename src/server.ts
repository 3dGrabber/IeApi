import {isDefined} from "./utils";
import { log } from "./logger";
import {IncomingMessage, ServerResponse} from "http";
import * as http from "http";
import { vrmDataStorage } from "./main";
import { getInstallationById, getInstallationByName } from "./storage-ram";

const port = 8080;

function serve(request: IncomingMessage, response: ServerResponse): void
{
    const url = request.url;
    if(url=='/favicon.ico'){
        response.end();
        return;
    }

    response.setHeader('Content-Type', 'application/json');

    if (isDefined(url))
    {
        const parsed = new URL(url, `https://${request.headers.host}`);  // way to parse path/queryString from host header
        let pathArr = parsed.pathname.split("/")
        log('SERVER: Request for '+JSON.stringify(pathArr))
        //response.write(parsed.pathname);
        switch(pathArr[1]){
            case 'GetAllInstallations':
                response.write(JSON.stringify(vrmDataStorage.vrmData));
                break;
            case 'GetInstallationByName':
                response.write(JSON.stringify(getInstallationByName(pathArr[2])));
                break;
            case 'GetInstallationById':
                response.write(JSON.stringify(getInstallationById(pathArr[2])));
                break;
        }
    }

    response.end();
}

export function startServer() :void {
    log(`SERVER: Starting server on port ${port}`)
    http.createServer(serve).listen(port);
}
