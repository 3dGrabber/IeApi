import fetch from 'node-fetch';
import { log } from "./logger";
import { delay, UserToken } from "./utils";
import { vrmUser, vrmPassword } from "../secrets";
import { Diagnostic, InstallationData, VrmResponse } from "./vrmTypes";
import { async } from 'rxjs';

// https://docs.victronenergy.com/vrmapi/overview.html
const vrmApi = 'https://vrmapi.victronenergy.com/v2/'

let token: UserToken;

export async function vrmGetToken(): Promise<void> {
  const credentials =
  {
    username: vrmUser,
    password: vrmPassword
  };
  const body = JSON.stringify(credentials);
  log('API: Logging into VRM...')
  const response = await fetch(vrmApi + 'auth/login', { method: 'POST', body });
  token = await response.json() as UserToken;
}

/*
* retryFetch is a wrapper for ajax calls. it will retry on network errors etc. but not on unwanted answer
*/
const retryFetch = (
  url: string,
  fetchOptions = {},
  retryAjaxCall = 3, //retry x times
  retryDelay = 5000, //wait before retry request
  timeout = 30000 //timeout request after x ms
) => {
  return new Promise((resolve, reject) => {
    // check for timeout
    if (timeout) setTimeout(() => reject('error: timeout'), timeout);

    const wrapper = (n: number) => {
      fetch(url, fetchOptions)
        .then((res) => {
          resolve(res)
        })
        .catch(async (err) => {
          if (n > 0) {
            await delay(retryDelay);
            wrapper(--n);
          } else {
            reject(err);
          }
        });
    };

    wrapper(retryAjaxCall);
  });
};

/*
* retryFetch is a wrapper for API calls. it will retry on success false
*/
async function callAPI(url: string) {
  let retryDelay = 2000
  const retryCount = 3

  const fetchOptions = {
    headers: {
      'X-Authorization': 'Bearer ' + token.token + '}'
    },
    method: 'GET'
  }

  log('API: ' + url)

  const loadData = async () => {
    try {
      const response: any = await retryFetch(vrmApi + url, fetchOptions)
      const fetchedData = await response.json()
      if (fetchedData && fetchedData.success) {
        if (fetchedData.tags) {
          fetchedData.records = fetchedData.tags //fix bad API design :)
        }
        if (fetchedData.records) {
          return fetchedData.records
        } else {
          return false
        }
      } else {
        return false
      }
    } catch {
      return false
    }
  }

  const stopcallAPI = new Promise((resolve, reject) => {
    const retryWrapper = async (n: number) => {
      let dataHopefullyLoaded = await loadData();
      if (dataHopefullyLoaded === false) {
        if (n > 0) {
          log('API: Data load unsuccesful. Retry in ' + retryDelay)
          await delay(retryDelay);
          retryDelay = retryDelay * 2
          retryWrapper(--n);
        } else {
          resolve([])
        }
      } else {
        resolve(dataHopefullyLoaded)
      }
    }

    retryWrapper(retryCount);
  })

  return await Promise.resolve(stopcallAPI)
}

export async function getAllInstallations(): Promise<InstallationData[]> {
  const installationsResponse: any = await callAPI('users/' + token.idUser + '/installations')
  log('API: got a total of ' + installationsResponse.length + ' installations')
  return installationsResponse
}

export async function getDiagnostics(idSite: number): Promise<Diagnostic[]> {
  const diagnosticsResponse: any = await callAPI('installations/' + idSite + '/diagnostics?count=1000')
  //log('got '+(diagnosticsResponse.records.length)+' diagnostics')
  return diagnosticsResponse
}

export async function getTags(idSite: number): Promise<string[]> {
  const tagsResponse: any = await callAPI('installations/' + idSite + '/tags')
  //log('got '+(tagsResponse.tags.length)+' tags')
  return tagsResponse
}