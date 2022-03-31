import {isDefined} from "./utils";
import {log} from "./logger";
import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import {vrmDataStorage} from "./main";
import {getInstallationById, getInstallationByName} from "./storage-ram";

const port = 8080;

function serve(request: IncomingMessage, response: ServerResponse): void
{
    const url = request.url;
    if (url === '/favicon.ico'){
        response.end();
        return;
    }

    response.setHeader('Content-Type', 'application/json');

    if (isDefined(url))
    {
        const parsed = new URL(url, `https://${request.headers.host}`);  // way to parse path/queryString from host header
        log('SERVER: Request for ' + parsed.pathname)

        const [_, command, argument] = parsed.pathname.split("/");

        switch(command){
            case 'GetAllInstallations':
                response.write(JSON.stringify(vrmDataStorage.vrmData));
                break;
            case 'GetInstallationByName':
                response.write(JSON.stringify(getInstallationByName(argument)));
                break;
            case 'GetInstallationById':
                response.write(JSON.stringify(getInstallationById(argument)));
                break;
        }
    }

    response.end();
}

export function startServer() :void {
    log(`SERVER: Starting server on port ${port}`)
    http.createServer(serve).listen(port);
}
