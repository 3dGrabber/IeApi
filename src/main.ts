
import {isDefined} from "./utils";
import fetch from "node-fetch";
import {vrmUser, vrmPassword} from "../secrets";
import {IncomingMessage, ServerResponse} from "http";
import * as http from "http";

const port = 8080;

// https://docs.victronenergy.com/vrmapi/overview.html
const vrmApi = "https://vrmapi.victronenergy.com/v2/"

type UserToken = { idUser: number, token: string }

async function vrmGet(): Promise<void>
{
    const credentials =
    {
        username : vrmUser,
        password : vrmPassword
    };

    const body = JSON.stringify(credentials);

    console.log("logging into VRM")

    const response = await fetch(vrmApi + "auth/login", {method: "POST", body});
    const json = await response.json() as UserToken;

    console.log(`got token ${json.token}`)
}


function serve(request: IncomingMessage, response: ServerResponse): void
{
    const url = request.url;

    if (isDefined(url))
    {
        const parsed = new URL(url, `https://${request.headers.host}`);  // way to parse path/queryString from host header
        response.write(parsed.pathname);
    }

    response.write('Hello World!');
    response.end();
}

vrmGet();

console.log(`starting server on port ${port}`)
http.createServer(serve).listen(port);


