import fetch from 'node-fetch';
import {log} from "./logger";
import {delay, UserToken} from "./utils";
import {vrmUser, vrmPassword} from "../secrets";

// https://docs.victronenergy.com/vrmapi/overview.html
const vrmApi = 'https://vrmapi.victronenergy.com/v2/'

let token: UserToken;

const retryFetch = (
    url: string,
    fetchOptions = {},
    retries = 3,
    retryDelay = 1000,
    timeout: number
  ) => {
    return new Promise((resolve, reject) => {
      // check for timeout
      if (timeout) setTimeout(() => reject('error: timeout'), timeout);

        const wrapper = (n: number) => {
        fetch(url, fetchOptions)
          .then((res) => resolve(res))
          .catch(async (err) => {
            if (n > 0) {
              await delay(retryDelay);
              wrapper(--n);
            } else {
              reject(err);
            }
          });
      };

      wrapper(retries);
    });
  };
  
  async function callAPI(url:string) {
      const headers = {
          'X-Authorization': 'Bearer ' + token.token + '}'
      }
      log('API: ' + url)
      let answer
      try{
          answer = retryFetch(vrmApi + url, {headers: headers, method: 'GET'}, 6, 30000, 0);
      }catch{
          answer = new Promise(function(myResolve) {
              myResolve({success: false, records: []});
          });
      }
      return answer
  }

export async function vrmGetToken(): Promise<void>
{
    const credentials =
    {
        username : vrmUser,
        password : vrmPassword
    };

    const body = JSON.stringify(credentials);

    log('API: Logging into VRM...')

    const response = await fetch(vrmApi + 'auth/login', {method: 'POST', body});
    token = await response.json() as UserToken;

    //log(`got token ${token.token}`)
    //log(`got idUser ${token.idUser}`)
}


export async function getAllInstallations(): Promise<object[]>{
    const response : any = await callAPI('users/' + token.idUser + '/installations')
    const installationsResponse = await response.json()
    log('API: got a total of ' + installationsResponse.records.length + ' installations')
    return installationsResponse.records
}

export async function getDiagnostics(idSite: number): Promise<object[]>{
    const response: any = await callAPI('installations/' + idSite + '/diagnostics')
    const diagnosticsResponse = await response.json()
    //log('got '+(diagnosticsResponse.records.length)+' diagnostics')
    return diagnosticsResponse.records
}

export async function getTags(idSite: number): Promise<string[]>{
    const response:any = await callAPI('installations/' + idSite + '/tags')
    const tagsResponse = await response.json()
    //log('got '+(tagsResponse.tags.length)+' tags')
    return tagsResponse.tags
}